import { test } from "@playwright/test";
import Login from "../../PageObject/Login"
import testData from '../../data/LoginData.json';
import dotenv from 'dotenv';
dotenv.config();


const login = new Login();

test.beforeEach("Open Browser", async () => {
  const BASE_URL = process.env.BASE_URL;
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in the environment variables.");
  }
  await login.commun.OpenBrowser(BASE_URL);
})
test.afterAll("Close Browser", async () => {
  await login.commun.CloseBrowser()
})
test.describe('[Authentication]', () => {
  test('[Authentication] User is able to log in successfully', async () => {
    const { username, password } = testData.Login;
    await login.LoginIn(username, password);
    await login.SuccessfulLogin();
  });


  test('[Authentication] Unsuccessful login – Invalid email or password', async () => {
    const { invalidUsername, invalidPassword } = testData.Login
    await login.LoginIn(invalidUsername, invalidPassword);
    await login.InsuccessfulLogin()
  });
  test('[Authentication] Logout', async () => {
    const { username, password } = testData.Login;
    await login.LoginIn(username, password);
    await login.SuccessfulLogin();
    await login.Logout()
  })
})
