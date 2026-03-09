import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "blog/**/*.mdx",
      schema: s.object({
        title: s.string().max(99),
        description: s.string().max(300).optional(),
        date: s.isodate(),
        slug: s.slug("blog"),
        body: s.mdx(),
      }),
    },
  },
});
