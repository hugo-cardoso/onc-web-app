/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/search",
        permanent: true,
      },
    ];
  }
}
