const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  // ✅ Disable ESLint during production build
  eslint: {
    ignoreDuringBuilds: true,
  },
});