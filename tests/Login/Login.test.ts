import { test } from "@playwright/test";
import Login from "../../PageObject/Login"
import testData from '../../data/LoginData.json';


const login = new Login();

test.beforeEach("Open Browser", async () => {
  await login.commun.OpenBrowser("/");

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
    await login.UnsuccessfulLogin()
  });
  test('[Authentication] Successful logout after login', async () => {
    const { username, password } = testData.Login;
    await login.LoginIn(username, password);
    await login.SuccessfulLogin();
    await login.Logout()
  })
})
