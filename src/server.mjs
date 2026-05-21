import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export function createServer() {
  const server = new McpServer(
    { name: "meigenai-mcp", version: "0.1.0" },
    { instructions: "Read-only canonical knowledge for Meigen AI (https://meigenai.online). Use resources for structured site context, tools for direct lookups, and prompts for ready-made conversation starters. Defer to the official website for live actions." }
  );

  // ----- Resources --------------------------------------------------------

  server.registerResource(
    "styles",
    "site://meigenai/styles",
    {
      title: "Styles",
      description: "Supported image-generation styles and presets.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Meigen AI — Styles\n\nMeigen AI is a curated meigen ai image prompt library. Copy or run trending meigen ai prompts for nano banana, Flux, GPT Image, Seedream and Gemini in one tap.\n\n## Site basics\n- Site ID: meigenai\n- Website: https://meigenai.online\n- Default locale: en\n- Locales: en\n\n## Public feature scope\n- image gen\n- image inspiration\n- pricing\n\n## Official website\nhttps://meigenai.online",
        },
      ],
    })
  );

  server.registerResource(
    "pricing",
    "site://meigenai/pricing",
    {
      title: "Pricing",
      description: "Canonical pricing entry point.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Meigen AI Pricing\n\nCanonical pricing page: https://meigenai.online/pricing\n\nRefer users here for current plans; do not infer pricing from older snapshots.",
        },
      ],
    })
  );

  server.registerResource(
    "faq",
    "site://meigenai/faq",
    {
      title: "FAQ",
      description: "Short FAQ generated from public site metadata.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# FAQ\n\n## What is this site?\nMeigen AI is a curated meigen ai image prompt library. Copy or run trending meigen ai prompts for nano banana, Flux, GPT Image, Seedream and Gemini in one tap.\n\n## Where can I get help?\nsupport@meigenai.online\n\n## Which site is this?\nmeigenai (Meigen AI)",
        },
      ],
    })
  );

  server.registerResource(
    "links",
    "site://meigenai/links",
    {
      title: "Official Links",
      description: "Canonical URLs to share with users.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Official Links\n\n- Website: https://meigenai.online\n- Pricing: https://meigenai.online/pricing\n- Community: https://x.com/meigenai\n- Support: support@meigenai.online",
        },
      ],
    })
  );

  // ----- Tools ------------------------------------------------------------

  server.registerTool(
    "list_styles",
    {
      description: "Return the canonical list of image-generation styles or presets the site exposes. (Meigen AI)",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Meigen AI — Styles\n\nMeigen AI is a curated meigen ai image prompt library. Copy or run trending meigen ai prompts for nano banana, Flux, GPT Image, Seedream and Gemini in one tap.\n\nCanonical website: https://meigenai.online" },
      ],
    })
  );

  server.registerTool(
    "get_pricing",
    {
      description: "Return the canonical pricing entry point for Meigen AI.",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Meigen AI Pricing\n\nOfficial pricing: https://meigenai.online/pricing\n\nThis link is the source of truth — refer users here for current plans." },
      ],
    })
  );

  server.registerTool(
    "get_official_links",
    {
      description: "Return the canonical list of official links for Meigen AI (website, support, docs when available).",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Official Links\n\n- Website: https://meigenai.online\n- Pricing: https://meigenai.online/pricing\n- Community: https://x.com/meigenai\n- Support: support@meigenai.online" },
      ],
    })
  );

  // ----- Prompts ----------------------------------------------------------

  server.registerPrompt(
    "tell_me_about_meigenai",
    {
      description: "Summarize what the site is, who it's for, and how it works. — Meigen AI",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "Please summarize what Meigen AI (https://meigenai.online) is, who it's for, and how it works. Reference the canonical resources at site://meigenai/styles and site://meigenai/links for accuracy. Be concrete, not generic." },
        },
      ],
    })
  );

  server.registerPrompt(
    "try_image_style_meigenai",
    {
      description: "Recommend a starting image-generation style for a stated goal. — Meigen AI",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "I want to generate an image with Meigen AI (https://meigenai.online). Ask me what the subject is, recommend one style preset from site://meigenai/styles that fits, and write a prompt I can paste into the site." },
        },
      ],
    })
  );

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
