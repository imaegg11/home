/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'out',
    output: 'export',
    // basePath: '/home',
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
