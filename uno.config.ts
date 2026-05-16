import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      paper: "#f7f7f5",
      ink: "#151515",
      muted: "#6f6d66",
      line: "#dedbd2",
      accent: "#7f4f24",
      soft: "#ebe8df",
    },
  },
  shortcuts: {
    container: "mx-auto w-full max-w-[39rem] px-6 sm:px-0",
    section: "py-11 sm:py-15",
    card: "border-t border-line",
    muted: "text-muted",
    "page-title": "text-2xl sm:text-3xl leading-tight font-600 tracking-normal",
    link: "link-underline text-muted hover:text-ink",
    eyebrow: "text-xs uppercase tracking-[0.18em] text-muted",
    "meta-row": "flex flex-wrap gap-2 text-xs text-muted",
  },
});
