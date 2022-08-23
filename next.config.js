const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.extensions = [".web.js", ...config.resolve.extensions];
    return config;
  },
};

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.jsx?$/,
        resolve: {
          fallback: {
            crypto: false,
          },
          fullySpecified: false,
        },
      });
    }
    return config;
  },
});
