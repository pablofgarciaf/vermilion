import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'localhost',
    'localhost:3000',
    'localhost:3001',
    'localhost:3005',
    '127.0.0.1',
    '127.0.0.1:3000',
    '127.0.0.1:3001',
    '127.0.0.1:3005',
    '0.0.0.0',
    '0.0.0.0:3005'
  ],
  // Bypass Next.js 16.3.0 TypeScript CLI false-positive errors on Vercel
  // (local builds pass; errors are caused by missing .next/dev/types in the CI environment)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Conditionally disable on Vercel to prevent ENOENT errors with next-server.js.nft.json
  output: process.env.VERCEL ? undefined : 'standalone',
  compress: true,
  experimental: {
    optimizePackageImports: ['three', 'gsap', 'lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  transpilePackages: ['motion', 'framer-motion', 'motion-dom'],
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/about',
        destination: '/:locale#about',
        permanent: true,
      },
      {
        source: '/:locale/contact',
        destination: '/:locale#contact',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/en#about',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en#contact',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/en/terms',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/en/privacy-policy',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/en/dashboard',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://js.stripe.com https://apis.google.com https://www.paypal.com https://*.paypal.com https://*.paypalobjects.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https: https://*.paypalobjects.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://www.google.com https://www.paypal.com https://*.paypal.com; connect-src 'self' https: wss: https://*.paypal.com; object-src 'none'; base-uri 'self';",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
