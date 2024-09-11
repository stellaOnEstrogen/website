/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.0x7ffed9b08230.dev',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
};

export default nextConfig;
