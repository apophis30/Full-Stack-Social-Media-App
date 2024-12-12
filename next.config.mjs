import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
