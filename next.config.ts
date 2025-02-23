import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-book-s3-bucket.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
