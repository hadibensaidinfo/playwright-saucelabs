import { expect, test } from "./Commun";
import commun from "../helpers/BrowserManager";
import selector from "./Locators/Login.json"
const { inputEmail, inputPassword, btnLogin, sidButton } = selector.Login

export default class Login {
  public commun = commun;
  public async LoginIn(username: string, password: string): Promise<void> {
    await test.step("Enter the email", async () => {
      await this.commun.FillElement(inputEmail, username);
    })
    await test.step('Enter password', async () => {
      await this.commun.FillElement(inputPassword, password);
    })
    await test.step('Click on the Login button', async () => {
      await this.commun.ClickElement(btnLogin);
    })
  }
  public async Logout() {
    const page = await this.commun.Instance();
    await this.commun.ClickElement(sidButton)
    const sideBar = await page.locator(selector.Login.sideBar)
    await expect(sideBar).toBeVisible()
    await this.commun.ClickElement(selector.Login.menuLogout)
    const currentUrl = page.url()
    console.log(currentUrl)
    await expect(currentUrl, "Logout doesn't work").toContain("/")
  }
  public async SuccessfulLogin(): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Verify that the user is logged in', async () => {
      const currentUrl = page.url()
      expect(currentUrl, "Unsuccessful login").toContain("/inventory.html")
    })
  }
  public async UnsuccessfulLogin(): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Verify that the user is not logged in', async () => {
      const currentUrl = await page.url()
      await expect(currentUrl).toContain("/")
      const webElement = await page.locator('[data-test="error"]')
      await expect(webElement).toBeVisible()
    })

  }
}
