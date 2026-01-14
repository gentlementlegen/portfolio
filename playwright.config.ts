import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000'
const baseURLObject = new URL(baseURL)
const webServerPort = baseURLObject.port || (baseURLObject.protocol === 'https:' ? '443' : '80')

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: `bun run dev:e2e -- --port ${webServerPort}`,
    url: new URL('/en', baseURL).toString(),
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
