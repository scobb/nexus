import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test/smoke',
  fullyParallel: false, // run serially to avoid DB conflicts on shared local instance
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:8787',
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
  webServer: {
    command: 'npx wrangler dev --local',
    url: 'http://localhost:8787',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
