import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0b0f14',
          raised: '#121826'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
