import { loginAsUser } from '../../helpers/auth';
import Login from '../../PageObject/Login';
import { test } from "@playwright/test";
import Products from "../../PageObject/Products";
import productsData from '../../data/ProductsData.json';

const product = new Products();
const login = new Login();

test.beforeEach("Open Browser and log in", async () => {
  await login.commun.OpenBrowser("/");
  await loginAsUser(login);
});

test.describe('[Products]', () => {
  const { Products } = productsData;
  test('[Products] User is able to select a product and verify it in the cart', async () => {
    await product.SelectProduct(Products);
    await product.verifySelectArticle(Products);
  });
});

test.afterAll("Close Browser", async () => {
  await login.commun.CloseBrowser();
});
