import { loginAsUser } from '../../helpers/auth'; // 🟢 maintenant c’est correct
import Login from '../../PageObject/Login';
import { test } from "@playwright/test";
import Products from "../../PageObject/Products";
import productsData from '../../data/ProductsData.json';
import dotenv from 'dotenv';
dotenv.config();

const product = new Products();
const login = new Login();

test.beforeEach("Open Browser", async () => {
  await login.commun.OpenBrowser(process.env.BASE_URL!);
  await loginAsUser(login);
});

test.describe('[Products]', () => {
  const { Products } = productsData;
  test('[Products] User is able to log in successfully', async () => {
    await product.SelectProduct(Products);
    await product.verifySelectArticle(Products);
  });
});

test.afterAll("Close Browser", async () => {
  await login.commun.CloseBrowser();
});
