# Playwright + TypeScript Automation Framework

![CI](https://github.com/galinalovets/playwright-typescript-framework/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)

An end-to-end test automation framework built with Playwright and TypeScript, following the Page Object Model. This is a learning-in-public project: I'm building it out feature by feature as I move from manual QA into automation, and documenting the process here.

## Status

| Feature | Status |
|---|---|
| Playwright setup | ✅ Done |
| TypeScript configuration | ✅ Done |
| Page Object Model | ✅ Done |
| Login tests | ✅ Done |
| Cart tests | ✅ Done |
| Fixtures | 🚧 In progress |
| API testing | 🚧 In progress |
| Reporting | ⬜ Planned |
| CI pipeline | ⬜ Planned |

## Project structure

```
tests/         # test specs
pages/         # Page Object Model classes
fixtures/      # custom Playwright fixtures (in progress)
utils/         # shared helpers
test-data/     # test data files
```

## Example: Page Object Model

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Log in' });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/login');
  await loginPage.login('testuser', 'securepassword');
  await expect(page).toHaveURL('/dashboard');
});
```

## Tech stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- GitHub Actions (CI — in progress)

## Getting started

```bash
npm install
npx playwright install
npx playwright test
```

## Roadmap

Next up: fixtures for reusable test setup, API-level test coverage, HTML reporting, and a working CI pipeline that runs the suite on every push. Follow along or open an issue with suggestions.

---
Built by [Halina Lavets](https://github.com/galinalovets) — Senior QA Engineer moving into test automation.
