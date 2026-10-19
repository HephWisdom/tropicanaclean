import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 768, 1024, 1440]) {
  test(`layout, assets and navigation at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "A cleaner space.",
    );
    for (const section of await page.locator("main > section").all()) {
      await section.scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    const brokenAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((anchors) =>
        anchors
          .filter((a) => !document.getElementById(a.hash.slice(1)))
          .map((a) => a.hash),
      );
    expect(brokenAnchors).toEqual([]);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter((img) => !img.complete || !img.naturalWidth)
              .map((img) => img.src),
          ),
      )
      .toEqual([]);
    expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `/tmp/tropicana-${width}.png`,
      fullPage: true,
    });
  });
}

test("service filters, quote preselection and area selection", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /For your property/ }).click();
  await expect(page.locator(".service-card")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: /For your property/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", {
      name: /Airbnb & Short-Let Support/,
    })
    .click();
  await expect(page.locator("#service")).toHaveValue(
    "Airbnb & Short-Let Support",
  );
  await expect(page.locator("#service")).toBeFocused();
  await page
    .locator(".area-list")
    .getByRole("button", { name: /Didsbury/ })
    .click();
  await expect(page.locator("#location")).toHaveValue("Didsbury");
  await expect(page.locator("#location")).toBeFocused();
  await page.getByRole("button", { name: /All services/ }).click();
  await expect(page.locator(".service-card")).toHaveCount(6);
});

test("quote validation, demo completion and no transmission or persistence", async ({
  page,
}) => {
  const transmissions = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") transmissions.push(request.url());
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Preview Quote Request" }).click();
  await expect(page.locator("#fullName")).toBeFocused();
  await expect(page.locator("[aria-invalid=true]")).toHaveCount(5);
  await page.locator("#fullName").fill("Demo Visitor");
  await page.locator("#email").fill("demo@example.com");
  await page.locator("#phone").fill("0161 123 4567");
  await page.locator("#service").selectOption("Deep Cleaning");
  await page.locator("#location").fill("Manchester");
  await page
    .locator("#message")
    .fill("Demo enquiry for the interaction check.");
  await page.getByRole("button", { name: "Preview Quote Request" }).click();
  await expect(page.getByRole("status")).toContainText("No enquiry was sent");
  await expect(page.getByRole("status")).toBeFocused();
  expect(transmissions).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  expect(await page.context().cookies()).toEqual([]);
  await page.getByRole("button", { name: "Try the form again" }).click();
  await expect(page.locator("#fullName")).toHaveValue("");
  await expect(page.locator("#service")).toHaveValue("");
  await expect(page.locator("#location")).toHaveValue("");
});

test("comparison supports keyboard and pointer input", async ({ page }) => {
  await page.goto("/");
  const slider = page.getByRole("slider");
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveValue("100");
  await slider.press("Home");
  await expect(slider).toHaveValue("0");
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("1");
  await slider.scrollIntoViewIfNeeded();
  const box = await slider.boundingBox();
  await page.mouse.click(box.x + box.width * 0.7, box.y + box.height / 2);
  expect(Number(await slider.inputValue())).toBeGreaterThan(60);
});

test("comparison accepts touch input", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/");
  const slider = page.getByRole("slider");
  await slider.scrollIntoViewIfNeeded();
  const box = await slider.boundingBox();
  await page.touchscreen.tap(box.x + box.width * 0.25, box.y + box.height / 2);
  expect(Number(await slider.inputValue())).toBeLessThan(35);
  await context.close();
});

test("mobile menu focus, Escape, navigation and scroll lock", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await expect(page.locator("#mobile-menu a").first()).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".mobile-phone")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Services/ })
    .click();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page).toHaveURL(/#services$/);
  await expect(page.locator(".header")).toHaveClass(/compact/);
});

for (const width of [375, 1440]) {
  test(`automated accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}
