import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";
import { buildEndGenerateOpenGraphImages } from "./plugins/og-image.mjs";

const vitepressDir = dirname(fileURLToPath(import.meta.url));
const POET_VERSION = readFileSync(resolve(vitepressDir, "..", "..", "VERSION"), "utf8").trim();

export default defineConfig({
  vite: {
    define: {
      __POET_VERSION__: JSON.stringify(POET_VERSION),
    },
  },
  base: "/poet/",
  title: "Poet",
  description:
    "Poet is an open-source AI coding framework that orchestrates agents using skills — reusable, self-scheduling units of work. Built with Go, it uses LLM-powered scheduling and a kitchen brigade model to automate code review, testing, planning, and more.",

  markdown: {
    theme: { light: "min-light", dark: "min-dark" },
  },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/poet/favicon.svg" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  ],

  transformHead({ pageData, siteData }) {
    // Add OG tags for pages the plugin doesn't cover (homepage, 404, cookbook index)
    if (pageData.relativePath === "index.md") {
      return [
        ["meta", { property: "og:title", content: siteData.title }],
        ["meta", { property: "og:description", content: siteData.description }],
        ["meta", { property: "og:url", content: "https://chrislernunes.github.io/poet/" }],
        ["meta", { property: "og:site_name", content: siteData.title }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:image", content: "https://chrislernunes.github.io/poet/og-introduction.png" }],
        ["meta", { property: "og:image:width", content: "1200" }],
        ["meta", { property: "og:image:height", content: "630" }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:image", content: "https://chrislernunes.github.io/poet/og-introduction.png" }],
      ];
    }
  },

  appearance: true,

  buildEnd: buildEndGenerateOpenGraphImages({
    baseUrl: "https://chrislernunes.github.io/poet",
    category: {
      byCustomGetter: (page) => {
        const dir = page.sourceFilePath.split("/")[1];
        if (dir === "concepts") return "Concepts";
        if (dir === "reference") return "Reference";
        if (dir === "cookbook") return "Cookbook";
        return "Guide";
      },
      fallbackWithFrontmatter: false,
    },
    maxCharactersPerLine: 15,
  }),

  themeConfig: {
    nav: [
      { text: POET_VERSION, link: `https://github.com/chrislernunes/poet/releases/tag/${POET_VERSION}` },
      { text: "GitHub", link: "https://github.com/chrislernunes/poet" },
    ],

    sidebar: [
      {
        text: "Introduction",
        link: "/introduction",
      },
      {
        text: "Getting Started",
        link: "/getting-started",
      },
      {
        text: "Thinking in Poet",
        link: "/thinking-in-poet",
      },
      {
        text: "Concepts",
        items: [
          { text: "Skills", link: "/concepts/skills" },
          { text: "Scheduling", link: "/concepts/scheduling" },
          { text: "Events", link: "/concepts/events" },
          { text: "Adapters", link: "/concepts/adapters" },
          { text: "Modes", link: "/concepts/modes" },
          { text: "Runtimes", link: "/concepts/runtimes" },
          { text: "Self-Learning (Optional)", link: "/concepts/brain" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "CLI", link: "/reference/cli" },
          { text: "Configuration", link: "/reference/configuration" },
          { text: "Glossary", link: "/reference/glossary" },
          { text: "FAQ", link: "/reference/faq" },
        ],
      },
      {
        text: "Cookbook",
        items: [
          {
            text: "Minimal Poet Loop",
            link: "/cookbook/minimal-poet-loop",
          },
          {
            text: "Multi-Stage Pipeline",
            link: "/cookbook/multi-stage-pipeline",
          },
          { text: "Self-Learning", link: "/cookbook/self-learning" },
          { text: "Model Routing", link: "/cookbook/model-routing" },
        ],
      },
      {
        text: "Community",
        items: [
          {
            text: "Discord",
            link: "https://discord.gg/RmJqTgkMz9",
          },
          {
            text: "File an Issue",
            link: "https://github.com/chrislernunes/poet/issues",
          },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    search: {
      provider: "local",
    },
  },
});
