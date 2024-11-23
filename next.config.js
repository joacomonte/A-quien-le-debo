/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    env: {
      BASE_URL: isProd ? 'https://pagadios.vercel.app' : 'http://localhost:3000/'
    }
}

module.exports = nextConfig

