const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://krdict.korean.go.kr/api/search/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
