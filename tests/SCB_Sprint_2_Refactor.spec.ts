import { test, expect } from '@playwright/test';
import { SubscriptionPage } from '../pages/scb/subscription.page';
import { LoginPage } from '../pages/modenaid/login.page';

test('User can subscribe product', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const subscriptionPage = new SubscriptionPage(page);

  await page.goto('https://scbweb-dev.modena.com/seamless-go-subscription/id_en');
  await subscriptionPage.clickViewSubscriptionStatus();
  await loginPage.login('erza.akbar@modena.com', 'P@ssw0rd');

});