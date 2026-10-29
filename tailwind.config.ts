import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--bg-void)",
        panel: "var(--bg-panel)",
        panel2: "var(--bg-panel-2)",
        pink: "var(--neon-pink)",
        hot: "var(--hot-pink)",
        purple: "var(--electric-purple)",
        violet: "var(--violet-glow)",
        cyan: "var(--cyan-accent)",
        ink: "var(--text)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["var(--font-press)", "monospace"],
        pixel: ["var(--font-vt)", "monospace"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 8px rgba(255,46,154,0.7), 0 0 24px rgba(139,44,255,0.45)",
        "neon-lg":
          "0 0 8px rgba(255,46,154,0.8), 0 0 24px rgba(255,46,154,0.45), 0 0 64px rgba(139,44,255,0.35)",
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #FF2E9A, #8B2CFF)",
        holo: "linear-gradient(120deg, #FF2E9A, #8B2CFF, #00F0FF, #FF6EC7, #FF2E9A)",
      },
    },
  },
  plugins: [],
};

export default config;
