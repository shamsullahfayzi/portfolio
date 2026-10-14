/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // plain static files: deploys to Vercel, Netlify or GitHub Pages
  images: { unoptimized: true },
};
export default nextConfig;
