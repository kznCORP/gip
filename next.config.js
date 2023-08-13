/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "maps.googleapis.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
