import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "nulwoevywftvey9d.public.blob.vercel-storage.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;

