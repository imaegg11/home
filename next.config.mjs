/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'out',
    output: 'export',
    basePath: '/home'
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
