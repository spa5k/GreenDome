/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@quran/core', '@quran/elements'],
	swcMinify: true,
};

module.exports = nextConfig;
