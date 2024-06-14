import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        winter: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/dot-notation, @typescript-eslint/no-unsafe-member-access
          ...require("daisyui/src/theming/themes")["winter"],
          "primary": "#0052FF",
          "primary-content": "#FFFFFF",
          "base-content": "#011046",
          "secondary": "#ECEFFA",
          "secondary-content": "#011046",
          "neutral": "#1E2025",
          "neutral-content": "#FFFFFF",
          "--rounded-btn": "9999px",
        },
      }
    ],
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
