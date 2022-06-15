/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        reactRemoveProperties: process.env.NODE_ENV === 'production'
    },
    eslint: {
        dirs: ['pages', 'src']
    },
}

module.exports = nextConfig
