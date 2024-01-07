/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com', // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'appstorrent.ru', // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다
                pathname: '**'
            },
        ]
    }
}

module.exports = nextConfig
