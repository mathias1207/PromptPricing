import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pop-purple': '#8B5CF6',
        'pop-pink': '#EC4899',
        'pop-yellow': '#FBBF24',
        'pop-blue': '#3B82F6',
        'pop-bg': '#F0F9FF', // Bleu très pâle
        'pop-dark': '#1e293b',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', 'monospace'],
        'sans': ['"Inter Tight"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cartoon': '4px 4px 0px 0px #1e293b',
        'cartoon-sm': '2px 2px 0px 0px #1e293b',
        'cartoon-lg': '6px 6px 0px 0px #1e293b',
        'cartoon-hover': '2px 2px 0px 0px #1e293b',
      },
      animation: {
        'bounce-slight': 'bounce-slight 2s infinite',
      },
      keyframes: {
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
