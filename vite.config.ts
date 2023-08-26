import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// Configura os teste para entender determinas sintaxes do ts;
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
