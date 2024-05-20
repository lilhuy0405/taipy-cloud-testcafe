import {Selector} from 'testcafe';

fixture('Taipy Cloud Register')
  .page('https://taipy.org/register');

const newAccount = {
  username: `testcafe${new Date().getTime()}@gmail.com`,
  password: 'luuduchuy@2001'
}

test('User register success', async t => {
  // Test code goes here
  await t.typeText(Selector('#email'), newAccount.username)
  await t.typeText(Selector('#password'), newAccount.password)
  await t.typeText(Selector('#confirm'), newAccount.password)
  await t.click(Selector('#root button').withText('Create account'))
  await t.expect(Selector('div.ant-space-item:nth-child(2) > div:nth-child(1)').innerText).eql(newAccount.username)

});
test('User register an existing account', async t => {

  await t.typeText(Selector('#email'), "luuhuyulei@gmail.com")
  await t.typeText(Selector('#password'), "123456")
  await t.typeText(Selector('#confirm'), "123456")
  await t.click(Selector('#root button').withText('Create account'))
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('/register') //not redirect to /deployments
  //try to go to /deployments  then redirect to /login
  await t.navigateTo('https://taipy.org/deployments')
  const currentUrl = await t.eval(() => window.location.href);
  await t.expect(currentUrl).contains('/login')
});

