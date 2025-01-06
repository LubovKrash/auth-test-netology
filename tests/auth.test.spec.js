// @ts-nocheck
const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.fill('input[placeholder="Email"]', email);
  await page.fill('input[name="password"]', password);

  await page.click('button:has-text("Войти")');

  // Ожидаемый результат

  await expect(page.locator('h2:has-text("Моё обучение")')).toHaveText(
    "Моё обучение",
    { timeout: 10000 }
  );
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.fill("input[name='email']", "proverka@mail.ru");
  await page.fill("input[placeholder='Пароль']", "qwerty");

  await page.click("button:has-text('Войти')");

  // Ожидаемый результат: сообщение об ошибке

  await expect(page.locator("[data-testid='login-error-hint']")).toContainText(
    "Вы ввели неправильно логин или пароль.",
    { timeout: 10000 }
  );
});
