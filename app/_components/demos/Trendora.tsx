"use client";

import { useMemo, useState } from "react";
import DemoFrame from "./DemoFrame";

type Product = { id: number; name: string; cat: string; price: number; hue: number };

// Invented catalogue.
const PRODUCTS: Product[] = [
  { id: 1, name: "Sample sneakers", cat: "Shoes", price: 48, hue: 12 },
  { id: 2, name: "Sample backpack", cat: "Bags", price: 36, hue: 215 },
  { id: 3, name: "Sample watch", cat: "Watches", price: 90, hue: 150 },
  { id: 4, name: "Sample boots", cat: "Shoes", price: 72, hue: 30 },
  { id: 5, name: "Sample tote", cat: "Bags", price: 24, hue: 280 },
  { id: 6, name: "Sample sports watch", cat: "Watches", price: 64, hue: 190 },
];
const CATS = ["All", "Shoes", "Bags", "Watches"];

type Role = "customer" | "seller";

export default function Trendora() {
  const [role, setRole] = useState<Role>("customer");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [stock, setStock] = useState<Record<number, boolean>>({ 1: true, 2: true, 3: false, 4: true, 5: true, 6: true });

  const shown = useMemo(
    () => PRODUCTS.filter((p) => (cat === "All" || p.cat === cat) && p.name.toLowerCase().includes(q.trim().toLowerCase())),
    [q, cat],
  );

  return (
    <DemoFrame label="Trendora · one app, two roles" note="Invented products">
      <div className="tr">
        <div className="tr-roles" role="tablist" aria-label="Sign in as">
          {(["customer", "seller"] as Role[]).map((r) => (
            <button key={r} type="button" role="tab" aria-selected={role === r} onClick={() => setRole(r)}>
              {r === "customer" ? "Customer" : "Seller"}
            </button>
          ))}
        </div>
        <p className="tr-auth mono">
          Signed in as {role}. {role === "customer" ? "Seller pages are locked." : "Customer checkout is hidden."}
        </p>

        {role === "customer" ? (
          <>
            <div className="tr-tools">
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" />
              <div className="tr-chips" role="group" aria-label="Filter by category">
                {CATS.map((c) => (
                  <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <ul className="tr-grid" aria-live="polite">
              {shown.map((p) => (
                <li key={p.id}>
                  <span className="tr-img" style={{ background: `hsl(${p.hue} 70% 62%)` }} aria-hidden="true" />
                  <strong>{p.name}</strong>
                  <span className="mono">
                    {p.cat} · ${p.price}
                  </span>
                </li>
              ))}
              {shown.length === 0 && <li className="tr-empty">Nothing matches.</li>}
            </ul>
          </>
        ) : (
          <ul className="tr-sell">
            {PRODUCTS.slice(0, 4).map((p) => (
              <li key={p.id}>
                <span>
                  <strong>{p.name}</strong> <span className="mono">${p.price}</span>
                </span>
                <button type="button" aria-pressed={stock[p.id]} onClick={() => setStock((s) => ({ ...s, [p.id]: !s[p.id] }))}>
                  {stock[p.id] ? "In stock" : "Sold out"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DemoFrame>
  );
}
