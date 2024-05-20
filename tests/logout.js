import {Selector} from 'testcafe';

fixture('Taipy Cloud Login')
  .page('https://taipy.org');

const loginAccount = {
  username: `luuhuyulei@gmail.com`,
  password: 'luuduchuy@2001'
}

test('User login then logout', async t => {

  // Test code goes here
  await t.typeText(Selector('#email'), loginAccount.username)
  await t.typeText(Selector('#password'), loginAccount.password)
  await t.click(Selector('#root button').withText('Login'))
  await t.expect(Selector('div.ant-space-item:nth-child(2) > div:nth-child(1)').innerText).eql(loginAccount.username)
  await t.click(Selector('div.ant-space-item:nth-child(2) > div:nth-child(1)'))
  await t.click(Selector('body > div:nth-child(2) > div > ul > li:nth-child(2) > span > button'))
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('/login') //not redirect to /deployments
  //try to go to /deployments  then redirect to /login
  await t.navigateTo('https://taipy.org/deployments')
  const currentUrl = await t.eval(() => window.location.href);
  await t.expect(currentUrl).contains('/login')

}).page('https://taipy.org/login');


