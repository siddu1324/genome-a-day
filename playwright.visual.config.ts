import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual-qa",
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3004",
    browserName: "chromium",
    channel: "chrome",
  },
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3004",
    url: "http://127.0.0.1:3004",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
