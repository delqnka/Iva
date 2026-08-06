function hostnameFromUrl(value) {
  if (!value) return null;

  try {
    return new URL(value).hostname;
  } catch {
    try {
      return new URL(`https://${value}`).hostname;
    } catch {
      return null;
    }
  }
}

const r2Host = hostnameFromUrl(process.env.NEXT_PUBLIC_R2_PUBLIC_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      ...(r2Host
        ? [
            {
              protocol: "https",
              hostname: r2Host,
              port: "",
              pathname: "/**"
            }
          ]
        : []),
      {
        protocol: "https",
        hostname: "pub-afdca1718c964f3183e7aa0553082c2f.r2.dev",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
