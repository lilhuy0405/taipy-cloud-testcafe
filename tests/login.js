import {Selector} from 'testcafe';

fixture('Taipy Cloud Login')
  .page('https://taipy.org/login');

test('User login using demo account', async t => {
  // Test code goes here
  await t.click(Selector('#root span').withText('Use demo account'))
  //expect page url is now /signup
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('https://taipy.org/deployments')
  await t.expect(Selector('div.ant-space-item:nth-child(2) > div:nth-child(1)').innerText).eql('demo@taipy.org')

});

test('User login using username password', async t => {
  const account = {
    username: 'luuhuyulei@gmail.com',
    password: 'luuduchuy@2001'
  }
  await t.typeText(Selector('#email'), account.username)
  await t.typeText(Selector('#password'), account.password)
  await t.click(Selector('#root button').withText('Login').withText('Login'))
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('https://taipy.org/deployments')
  await t.expect(Selector('div.ant-space-item:nth-child(2) > div:nth-child(1)').innerText).eql(account.username)
});

test('User login with wrong username', async t => {
  const account = {
    username: 'thisisdummyemailthatnverexist@gmail.com',
    password: 'luuduchuy@2001'
  }
  await t.typeText(Selector('#email'), account.username)
  await t.typeText(Selector('#password'), account.password)
  await t.click(Selector('#root button').withText('Login').withText('Login'))
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('/login') //not redirect to /deployments
  //try to go to /deployments  then redirect to /login
  await t.navigateTo('https://taipy.org/deployments')
  const currentUrl = await t.eval(() => window.location.href);
  await t.expect(currentUrl).contains('/login')
});

test('User login with wrong password', async t => {
  const account = {
    username: 'luuuhuyulei@gmail.com',
    password: 'this-is-a-wrong-password'
  }
  await t.typeText(Selector('#email'), account.username)
  await t.typeText(Selector('#password'), account.password)
  await t.click(Selector('#root button').withText('Login').withText('Login'))
  const url = await t.eval(() => window.location.href);
  await t.expect(url).contains('/login') //not redirect to /deployments
  //try to go to /deployments  then redirect to /login
  await t.navigateTo('https://taipy.org/deployments')
  const currentUrl = await t.eval(() => window.location.href);
  await t.expect(currentUrl).contains('/login')
});