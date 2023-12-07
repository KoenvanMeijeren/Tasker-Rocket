/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_CONTENT_REPOSITORY: process.env.GITHUB_CONTENT_REPOSITORY,
        GITHUB_REPOSITORY_IS_PRIVATE: process.env.GITHUB_REPOSITORY_IS_PRIVATE,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    webpack: (config) => {
        config.resolve = {
            ...config.resolve,
        };
        return config;
    },
};

module.exports = nextConfig;
