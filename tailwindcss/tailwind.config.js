/** @type {import('tailwindcss').Config} */
export default {
  content: [/* .html, src 파일 스캔을 위한 content설정 */
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

