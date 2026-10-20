// Cloudflare Worker in front of the static site. It answers one route, POST /api/request-demo,
// and mails the visitor's demo request to me through Cloudflare Email Routing (the DEMO_MAIL binding).
// Every other path goes straight to the static files in ./out (see run_worker_first in wrangler.jsonc).
import { EmailMessage } from "cloudflare:email";

const PROJECTS = ["REDMARS", "Al-Raheel Travel Agency"];
const MAX_BODY = 8 * 1024;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const b64 = (text) => {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};
const wrap = (s) => s.match(/.{1,76}/g)?.join("\r\n") ?? "";

function buildMessage({ from, to, replyTo, subject, text }) {
  const id = `<${crypto.randomUUID()}@${from.split("@")[1]}>`;
  return [
    `From: Portfolio demo requests <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: ${id}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrap(b64(text)),
    "",
  ].join("\r\n");
}

async function requestDemo(request, env) {
  if (request.method !== "POST") return json({ error: "method" }, 405);

  // Only my own pages may post here.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "origin" }, 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "too-large" }, 413);
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ error: "bad-json" }, 400);
  }

  // Hidden field a person never fills in: bots do. Answer "ok" so they learn nothing.
  if (clean(data.website, 200)) return json({ ok: true });

  const name = clean(data.name, 100);
  const email = clean(data.email, 254);
  const message = clean(data.message, 2000);
  const project = clean(data.project, 80);
  if (!name || !message || !PROJECTS.includes(project)) return json({ error: "invalid" }, 422);
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return json({ error: "email" }, 422);

  const subject = `Demo request: ${project}`.replace(/[\r\n]/g, " ");
  const text = `New demo request for ${project}\r\n\r\nName: ${name}\r\nEmail: ${email}\r\n\r\n${message}\r\n`;
  try {
    const mail = new EmailMessage(env.FROM, env.TO, buildMessage({ from: env.FROM, to: env.TO, replyTo: email, subject, text }));
    await env.DEMO_MAIL.send(mail);
  } catch (err) {
    console.error("send failed", err);
    return json({ error: "send" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/request-demo") return requestDemo(request, env);
    if (pathname.startsWith("/api/")) return json({ error: "not-found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
