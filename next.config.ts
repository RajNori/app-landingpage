import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: /node_modules|\.git|\.next|\.playwright-cli/,
        };
        return config;
    },
};

export default nextConfig;
