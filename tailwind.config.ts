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
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ac',
          300: '#f6ba77',
          400: '#f19340',
          500: '#ed7620',
          600: '#de5c13',
          700: '#b84512',
          800: '#933817',
          900: '#773015',
        },
        secondary: {
          50: '#f8f6f4',
          100: '#efeae5',
          200: '#ddd3c9',
          300: '#c7b5a6',
          400: '#af9381',
          500: '#9f7c67',
          600: '#926c5b',
          700: '#79584c',
          800: '#644a42',
          900: '#533f38',
        }
      },
    },
  },
  plugins: [],
};
export default config;
