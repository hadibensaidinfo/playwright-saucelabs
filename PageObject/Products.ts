import { expect, test } from "./Commun";

import commun from "../helpers/BrowserManager";

import selector from "./Locators/Products.json"
const { btnAddToCard, icnNumberCommand, panier } = selector.products

export default class Products {
  public commun = commun;
  public async SelectProduct(product: Array<string>): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('🛒 Sélection des produits un par un', async () => {
      var nbrCommand: number = 0;
      for (const item of product) {
        nbrCommand++;
        const newbtnAddToCard = btnAddToCard.replace("xxxx", item)
        await this.commun.ClickElement(newbtnAddToCard);
        const webElement = page.locator(newbtnAddToCard)
        await expect(webElement).toHaveText("REMOVE")
        const numberOfCommand = page.locator(icnNumberCommand)
        await expect(numberOfCommand).toHaveText(nbrCommand.toString())
      }
    })
  }
  public async verifySelectArticle(product: Array<string>): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Naviguer Vers le panier', async () => {
      await this.commun.ClickElement(panier);
    })
    await test.step('🧾 Vérification des produits dans le panier', async () => {
      const webElements = await page.locator(".cart_list .inventory_item_name").all();
      for (const item of webElements) {
        const itemText = await item.textContent();
        expect(product).toContain(itemText?.trim());
      }
    });
  }
}