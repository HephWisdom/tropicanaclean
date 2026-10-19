import { test, expect } from "@playwright/test";

test("hero video plays silently and can be paused and resumed by keyboard", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const video = page.locator(".hero-media video");
  await expect(
    page.getByRole("button", { name: "Pause hero video" }),
  ).toBeVisible();
  await expect
    .poll(() => video.evaluate((el) => el.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(
    await video.evaluate((el) => el.muted && el.duration >= 60 && !el.error),
  ).toBe(true);
  await page.getByRole("button", { name: "Pause hero video" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
  await page.getByRole("button", { name: "Play hero video" }).press("Enter");
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(false);
  await page.screenshot({ path: "/tmp/tropicana-video-desktop.png" });
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
});

test("reduced motion shows a still image until the visitor chooses to play", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/");
  const video = page.locator(".hero-media video");
  expect(
    await video.evaluate(
      (el) => el.paused && !el.autoplay && Boolean(el.poster),
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".feeling-stroke")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  const control = page.getByRole("button", { name: "Play hero video" });
  await expect(control).toBeVisible();
  const buttonBox = await control.boundingBox();
  const sealBox = await page.locator(".fresh-seal").boundingBox();
  expect(
    buttonBox.x + buttonBox.width <= sealBox.x ||
      buttonBox.y + buttonBox.height <= sealBox.y,
  ).toBe(true);
  await control.click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(false);
  await page.getByRole("button", { name: "Pause hero video" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
  await page.screenshot({ path: "/tmp/tropicana-video-mobile.png" });
});

test("unavailable video falls back to the matching still photograph", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/videos/hero-cleaning.mp4", (route) => route.abort());
  await page.goto("/");
  const fallback = page.locator(".hero-media img");
  await expect(fallback).toBeVisible();
  await expect
    .poll(() => fallback.evaluate((el) => el.complete && el.naturalWidth > 0))
    .toBe(true);
  await expect(page.locator(".hero-video-toggle")).toHaveCount(0);
});

test("care section plays a one-minute video on arrival and keeps its own pause state", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  const careRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("/videos/care-cleaning.mp4"))
      careRequests.push(request.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Pause hero video" }),
  ).toBeVisible();
  expect(careRequests).toEqual([]);
  await page.locator(".why-image").scrollIntoViewIfNeeded();
  const care = page.locator(".care-media video");
  await expect(
    page.getByRole("button", { name: "Pause care section video" }),
  ).toBeVisible();
  await expect
    .poll(() => care.evaluate((video) => video.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(
    await care.evaluate(
      (video) => video.duration >= 60 && video.muted && !video.error,
    ),
  ).toBe(true);
  await expect
    .poll(() =>
      page.locator(".hero-media video").evaluate((video) => video.paused),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Pause care section video" }).click();
  await expect.poll(() => care.evaluate((video) => video.paused)).toBe(true);
  await page
    .getByRole("button", { name: "Play care section video" })
    .press("Enter");
  await expect.poll(() => care.evaluate((video) => video.paused)).toBe(false);
  await page.getByRole("button", { name: "Pause care section video" }).click();
  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.locator(".why-image").scrollIntoViewIfNeeded();
  await expect.poll(() => care.evaluate((video) => video.paused)).toBe(true);
  await page.mouse.move(1, 1);
  await page.screenshot({ path: "/tmp/tropicana-care-desktop.png" });
});

test("care video respects reduced motion on mobile and falls back if unavailable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 1000 });
  await page.goto("/");
  await page.locator(".why-image").scrollIntoViewIfNeeded();
  const care = page.locator(".care-media video");
  expect(await care.evaluate((video) => video.paused && !video.autoplay)).toBe(
    true,
  );
  await page.getByRole("button", { name: "Play care section video" }).click();
  await expect.poll(() => care.evaluate((video) => video.paused)).toBe(false);
  await page.getByRole("button", { name: "Pause care section video" }).click();
  await page.mouse.move(1, 1);
  await page.screenshot({ path: "/tmp/tropicana-care-mobile.png" });
  await page.route("**/videos/care-cleaning.mp4", (route) => route.abort());
  await page.reload();
  await page.locator(".why-image").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Play care section video" }).click();
  await expect(page.locator(".care-media img")).toBeVisible();
});
