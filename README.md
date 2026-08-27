# Playwright + TypeScript Automation Framework

![CI](https://github.com/galinalovets/playwright-typescript-framework/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)

An end-to-end test automation framework built with Playwright and TypeScript, following the Page Object Model. This is a learning-in-public project: I'm building it out feature by feature, developing deeper expertise in test automation and quality engineering, and documenting the process here.

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
| API testing | ✅ Done |
| API response validation | ✅ Done |

## Project structure

```
├── components/              # reusable UI components
├── data/                    # test data
│   └── api.schemas.ts       # Zod schemas for API responses
├── fixtures/                # custom Playwright fixtures
├── pages/                   # Page Object Model classes
├── tests/
│   └── api/
│       ├── clients/         # API client classes
│       ├── posts/           # Posts API tests
│       └── users/           # Users API tests
├── auth.setup.ts            # authentication setup
├── playwright.config.ts
└── package.json
```

## Example: Page Object Model

```typescript
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

## Tech stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- API testing
- Zod
- GitHub Actions (CI/CD)
- Git / GitHub
- HTML Test Reports


## Getting started

Install dependencies:

```bash
npm ci
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
- API testing with Playwright API

Next:
- Expand API test coverage
- Authentication / authorization testing
- Advanced API scenarios
- Improve test data management
- Explore mocking and network interception

---
Built by [Halina Lavets](https://github.com/galinalovets) — Senior QA Engineer building and expanding my automation skills.
