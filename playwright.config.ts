import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.BASE_URL || 'http://localhost:8787'
const isRemote = !!process.env.BASE_URL

export default defineConfig({
  testDir: './test/smoke',
  fullyParallel: false, // run serially to avoid DB conflicts on shared local instance
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: 'line',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }, // 390px width — validates no horizontal overflow
    },
  ],
  // Only start local dev server when BASE_URL is not set
  ...(isRemote
    ? {}
    : {
        webServer: {
          command: 'npx wrangler dev --local',
          url: 'http://localhost:8787',
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
          stdout: 'ignore',
          stderr: 'pipe',
        },
      }),
})
