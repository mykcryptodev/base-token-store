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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dark: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/dot-notation, @typescript-eslint/no-unsafe-member-access
          ...require("daisyui/src/theming/themes")["black"],
          "primary": "#0033CC",
          "primary-content": "#C9CCD5",
          // "secondary": "#C9CCD5",
          // "secondary-content": "#011046",
          "warning": "#EFD7BB",
          "warning-content": "#141414",
          "--rounded-btn": "9999px",
          "--rounded-box": "1rem",
        },
      }
    ],
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
