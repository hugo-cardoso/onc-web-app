/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [{
       source: '/app',
       destination: '/app/search',
       permanent: true,
    }];
 },
}
