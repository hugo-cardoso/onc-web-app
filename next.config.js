/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/search",
        permanent: true,
      },
    ];
  },
  pwa: {
    dest: "public",
		runtimeCaching,
  },
});
