// add last commit date as a variable to webpack
const webpack = require('webpack'); // eslint-disable-line
const gitprocess = require('child_process');
const LoadCommitDate = gitprocess
  .execSync('git log -1 --date=format:"%Y/%m/%d" --format="%ad"')
  .toString();

// bundle analyzer for checking bundle makeup
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
    config.plugins.push(
      new webpack.DefinePlugin({
        COMMITDATE: JSON.stringify(LoadCommitDate),
      })
    );
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
