import Login from '../PageObject/Login';
import testData from '../data/LoginData.json';

export async function loginAsUser(login: Login): Promise<void> {
  const { username, password } = testData.Login;
  await login.LoginIn(username, password);
  await login.SuccessfulLogin();
}
