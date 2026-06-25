import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Browser, type Page } from "@playwright/test";

const phase = process.env.VISUAL_QA_PHASE ?? "before";
const outputRoot = path.join(process.cwd(), "docs", "visual-qa", phase);

const routes = [
  { name: "home", path: "/", readyText: "Axolotl limb regeneration" },
  { name: "specimen", path: "/specimen/axolotl-regeneration", readyText: "WHY IT MATTERS" },
  { name: "logbook", path: "/logbook", readyText: "Signals Recorded" },
] as const;

type VisualViewport = {
  name: string;
  width: number;
  height: number;
  isMobile?: boolean;
};

const viewports: VisualViewport[] = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "laptop-1280x800", width: 1280, height: 800 },
  { name: "mobile-390x844", width: 390, height: 844, isMobile: true },
] as const;

async function assertHealthyPage(page: Page) {
  await expect(page.locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")).toHaveCount(0);
  await expect.poll(() => page.locator("body").innerText()).not.toBe("");
}

async function seedLogbookState(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("genome-day:read-specimens", JSON.stringify(["axolotl-regeneration"]));
    window.localStorage.setItem("genome-day:saved-specimens", JSON.stringify(["axolotl-regeneration"]));
    window.localStorage.setItem("genome-day:last-visit", "2026-06-25");
    window.localStorage.setItem("genome-day:streak", "1");
  });
}

async function captureViewport(browser: Browser, viewport: VisualViewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: Boolean(viewport.isMobile),
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await seedLogbookState(page);

  for (const route of routes) {
    await page.goto(route.path);
    await assertHealthyPage(page);
    await expect(page.getByText(route.readyText).first()).toBeVisible();
    await page.waitForTimeout(6_200);
    await page.screenshot({
      path: path.join(outputRoot, viewport.name, `${route.name}.png`),
      fullPage: false,
    });
  }

  await context.close();
}

test("capture visual QA screenshots", async ({ browser }) => {
  await mkdir(outputRoot, { recursive: true });

  for (const viewport of viewports) {
    await mkdir(path.join(outputRoot, viewport.name), { recursive: true });
    await captureViewport(browser, viewport);
  }
});
