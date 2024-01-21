/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'appstorrent.ru',
                pathname: '**'
            },
        ]
    }
}

module.exports = nextConfig
