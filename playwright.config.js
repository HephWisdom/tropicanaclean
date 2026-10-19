import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const installedChromium =
  "/snap/chromium/current/usr/lib/chromium-browser/chrome";
const executablePath =
  process.env.CHROMIUM_PATH ||
  (existsSync(installedChromium) ? installedChromium : undefined);

export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:5173",
    reducedMotion: "reduce",
    launchOptions: {
      executablePath,
      args: ["--no-sandbox", "--disable-gpu"],
    },
  },
  reporter: "list",
});
