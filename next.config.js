/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: isProd ? 'https://pagadios.vercel.app' : 'http://localhost:3000'
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Apply CORS headers to all routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://192.168.0.3:3000', // Whitelist this domain
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization', // Allowed headers
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
