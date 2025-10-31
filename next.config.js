// // next.config.js

const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true' || process.env.NODE_ENV === 'production' && process.env.FORCE_EXPORT === 'true';

const nextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors in build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors if any
  },
  output: isStaticExport ? "export" : undefined,
  // output: "export",
  images: {
    unoptimized: true, 
  },
  trailingSlash: true, // ✅ Ensures every route like /admin → /admin/index.html
  // Note: headers() not supported with static export
};

module.exports = nextConfig;



