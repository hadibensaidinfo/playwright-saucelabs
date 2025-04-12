import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir : "./tests",
  testMatch: '**.test.ts',

  fullyParallel: true,
  use : {
    launchOptions: {
      slowMo: 300 
    },
    baseURL: 'https://www.saucedemo.com/v1',
    headless: false,
    screenshot: 'on',
    video: 'retry-with-video',
    viewport : { width: 1200, height: 800 }
  },
  expect : {
    timeout : 5
  },
  retries : 1,
  outputDir: 'Reports',
  reporter: [["dot"],["json",{
    outputFile: "jsonReports/jsonReport.json"
  }],["html",{
    open:'on-failure'
  }]]

  
});
