const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.resolve.extensions = [".web.js", ...config.resolve.extensions];
    // for pdf viewer
    config.module.rules.push({
      test: /pdfjs-dist\/build\/pdf\.worker\.js$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    });
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
