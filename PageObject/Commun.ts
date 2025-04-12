import { chromium, Page } from "playwright";

export class Commun {
  private browser: any;
  private page: Page | null = null;

  public async Instance(): Promise<Page> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: false});
    }
    if (!this.page) {
      const context = await this.browser.newContext();
      this.page = await context.newPage();
    }
    return this.page!;
  }

  public async OpenBrowser(url: string): Promise<void> {
    const page = await this.Instance();
    await page.goto(url);
  }

  public async ClickElement(locatorElement: string): Promise<void> {
    try {
      const page = await this.Instance();
      const webElement = await page.waitForSelector(locatorElement);
      await webElement.click();
    } catch (error) {
      console.error('Error occurred while trying to click the element:', error.message);
    }
  }

  // Remplir un champ
  public async FillElement(locatorElement: string, content: string): Promise<void> {
    try {
      const page = await this.Instance();
      const webElement = await page.waitForSelector(locatorElement);
      await webElement.fill(content);
    } catch (error) {
      console.error('Error occurred while trying to fill the element:', error.message);
      throw error;
    }
  }

  public async CloseBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export { expect, Page, test } from '@playwright/test';