import { expect, test } from "./Commun";
import commun from "../helpers/BrowserManager";

import selector from "./Locators/Login.json"
const { inputEmail, inputPassword, btnLogin, sidButton } = selector.Login

export default class Login {
  public commun = commun;
  public async LoginIn(username: string, password: string): Promise<void> {
    await test.step("Saisir L'email", async () => {
      await this.commun.FillElement(inputEmail, username);
    })
    await test.step('Saisir mot de passe', async () => {
      await this.commun.FillElement(inputPassword, password);
    })
    await test.step('Cliquer sur Le Bouton Login', async () => {
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
    await expect(currentUrl, "Logout Don't work").toContain("/v1/index.html")
  }
  public async SuccessfulLogin(): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Vérifier Que L\'utilisateur est connecté', async () => {
      const currentUrl = page.url()
      expect(currentUrl, "Insuccessful Login").toContain("/inventory.html")
    })
  }
  public async InsuccessfulLogin(): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Vérifier Que L\'utilisateur n\'est pas connecté', async () => {
      const currentUrl = await page.url()
      await expect(currentUrl).toContain("/v1/")
      const webElement = await page.locator('[data-test="error"]')
      await expect(webElement).toBeVisible()
    })

  }
}
