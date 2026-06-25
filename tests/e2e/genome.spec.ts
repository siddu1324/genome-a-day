import { expect, test, type Page } from "@playwright/test";

const specimenId = "axolotl-regeneration";

function captureConsoleErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  return errors;
}

async function expectHealthyPage(page: Page) {
  await expect(page.locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")).toHaveCount(0);
  await expect.poll(() => page.locator("body").innerText()).not.toBe("");
}

test.beforeEach(async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://127.0.0.1:3003" });
  await page.addInitScript(() => {
    if (!window.sessionStorage.getItem("genome-day:e2e-cleared")) {
      window.localStorage.clear();
      window.sessionStorage.setItem("genome-day:e2e-cleared", "true");
    }
  });
});

test("homepage, save, copy, detail, and logbook loop works", async ({ page }) => {
  const consoleErrors = captureConsoleErrors(page);

  await page.goto("/");
  await expectHealthyPage(page);
  await expect(page.getByRole("heading", { name: "Axolotl limb regeneration" })).toBeVisible();
  await expect(page.getByText("Some organisms heal. Axolotls negotiate with injury.", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Go Deeper/ })).toBeVisible();

  await expect
    .poll(() => page.evaluate((id) => JSON.parse(window.localStorage.getItem("genome-day:read-specimens") || "[]").includes(id), specimenId))
    .toBe(true);

  await page.getByRole("button", { name: "Save to Logbook" }).click();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();

  await page.reload();
  await expectHealthyPage(page);
  await expect(page.getByText("Saved to your logbook")).toBeVisible();
  await expect(page.evaluate((id) => JSON.parse(window.localStorage.getItem("genome-day:saved-specimens") || "[]").includes(id), specimenId)).resolves.toBe(true);

  await page.getByRole("button", { name: "Copy LinkedIn Post" }).first().click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  await expect(page.evaluate(() => navigator.clipboard.readText())).resolves.toContain("Axolotls do something biology keeps trying to explain");

  await page.getByRole("link", { name: /Go Deeper/ }).click();
  await expect(page).toHaveURL(/\/specimen\/axolotl-regeneration$/);
  await expectHealthyPage(page);
  await expect(page.getByText("WHY IT MATTERS")).toBeVisible();
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible();

  await page.goto("/logbook");
  await expectHealthyPage(page);
  await expect(page.getByRole("heading", { name: "Signals Recorded" })).toBeVisible();
  await expect(page.getByText("Saved specimen")).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("required routes render without framework overlays", async ({ page }) => {
  const consoleErrors = captureConsoleErrors(page);

  for (const route of ["/", "/specimen/axolotl-regeneration", "/logbook"]) {
    await page.goto(route);
    await expectHealthyPage(page);
    await expect(page.getByText("Genome of the Day")).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});

test("reduced motion context still renders the reveal content", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "reduced-motion", "Reduced motion is covered by the dedicated project.");
  const consoleErrors = captureConsoleErrors(page);

  await page.goto("/");
  await expectHealthyPage(page);
  await expect(page.getByRole("heading", { name: "Axolotl limb regeneration" })).toBeVisible();
  await expect(page.getByText("The strangest part is not that the limb returns.").first()).toBeVisible();
  await expect(page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).resolves.toBe(true);
  expect(consoleErrors).toEqual([]);
});
