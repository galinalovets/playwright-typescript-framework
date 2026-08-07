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
| Checkout flow | ✅ Done |
| Fixtures | ✅ Done |
| Authentication with storageState | ✅ Done |
| GitHub Actions CI | ✅ Done |
| HTML reporting | ✅ Done |
| API testing | 🚧 Planned |

## Project structure

```
├── components/ # reusable UI components
├── data/ # test data
├── fixtures/ # custom Playwright fixtures
├── pages/ # Page Object Model classes
├── tests/ # test scenarios
├── auth.setup.ts # authentication setup
├── playwright.config.ts
└── package.json
```

## Example: Page Object Model

```

// pages/InventoryPage.ts

export class InventoryPage extends BasePage {

    readonly products: Locator;

    constructor(page: Page) {
        super(page);
        this.products = page.locator('.inventory_item');
    }

    getProduct(productName: string): Locator {
        return this.products.filter({
            hasText: productName
        });
    }

    async addProductToCart(productName: string) {
        await this.getProduct(productName)
            .getByRole('button', { name: 'Add to cart' })
            .click();
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
- GitHub Actions (CI/CD)
- HTML Test Reports


## Getting started

Install dependencies:

```bash
npm ci
npm install
npx playwright install
npx playwright test
```

## Roadmap

Completed:
- Page Object Model architecture
- Reusable fixtures
- Authentication with storageState
- GitHub Actions CI pipeline
- End-to-end checkout flow

Next:
- API testing with Playwright request
- Improve reporting
- Add more complex test scenarios
- Framework optimization
  
---
Built by [Halina Lavets](https://github.com/galinalovets) — Senior QA Engineer moving into test automation.
