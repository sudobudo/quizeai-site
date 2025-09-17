import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          dark: '#0B0B0F',
        },
      },
      backgroundImage: {
        'glow': 'radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, rgba(0,0,0,0) 60%)',
      },
    },
  },
  plugins: [],
}
export default config
