import { expect, test } from "./Commun";
import commun from "../helpers/BrowserManager";
import selector from "./Locators/Products.json"
const { btnAddToCard, icnNumberCommand, cart } = selector.products

export default class Products {
  public commun = commun;
  public async SelectProduct(product: Array<string>): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('🛒 Select products one by one', async () => {
      var nbrCommand: number = 0;
      for (const item of product) {
        nbrCommand++;
        const newbtnAddToCard = btnAddToCard.replace("xxxx", item)
        await this.commun.ClickElement(newbtnAddToCard);
        const webElement = page.locator(newbtnAddToCard)
        await expect(webElement).toHaveText("Remove")
        const numberOfCommand = page.locator(icnNumberCommand)
        await expect(numberOfCommand).toHaveText(nbrCommand.toString())
      }
    })
  }
  public async verifySelectArticle(product: Array<string>): Promise<void> {
    const page = await this.commun.Instance();
    await test.step('Navigate to the cart', async () => {
      await this.commun.ClickElement(cart);
    })
    await test.step('🧾 Verify products in the cart', async () => {
      const webElements = await page.locator(".cart_list .inventory_item_name").all();
      for (const item of webElements) {
        const itemText = await item.textContent();
        expect(product).toContain(itemText?.trim());
      }
    });
  }
}