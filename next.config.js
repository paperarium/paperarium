const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['wcdvzivrzlrhqqewtlem.supabase.co'],
  },
  env: {
    IMGIX: 'papercraftplace.imgix.net',
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      // here doing the swiper loader and declaring no sideEffects
      test: /swiper\.esm\.js/,
      sideEffects: false,
    });
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
