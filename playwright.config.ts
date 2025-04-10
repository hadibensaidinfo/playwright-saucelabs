import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir : "./tests",
  // testMatch: ["tests/Login.test.ts"],
  use : {
    headless: false,
    screenshot: 'on',
    video: 'retry-with-video',
    viewport : { width: 1200, height: 800 }
  },
  expect : {
    timeout : 5
  },
  retries : 2,
  reporter: [["dot"],["json",{
    outputFile: "jsonReports/jsonReport.json"
  }],["html",{
    open:'on-failure'
  }]]
});
