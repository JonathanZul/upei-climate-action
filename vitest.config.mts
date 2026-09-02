import { defineConfig } from "vitest/config";

// Deliberately `.mts`, not `.ts`: Vite bundles a plain `.ts` config to CommonJS and
// `require()`s it, which fails under Node 18 because Vitest's config entry pulls in
// ESM-only dependencies. The `.mts` extension makes it load as ESM instead.
export default defineConfig({
  test: {
    // These are pure Node unit tests — no DOM, no React rendering.
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
