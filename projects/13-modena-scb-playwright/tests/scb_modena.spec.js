// tests/subscription-cart.spec.js
const { test, expect } = require('@playwright/test');
const { generateProductSlug } = require('../utils/urlHelper');
const LandingPage = require('../pages/LandingPage');
const CartPage = require('../pages/CartPage');
const { PRODUCTS } = require('../constants/products');
const { SUBSCRIPTION_URL } = require('../constants/urls'); // ← import URL


test.describe('Subscription Cart Tests', () => {
  
  test('add subscription and verify cart badge', async ({ page }) => {
    test.setTimeout(60000);
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);

    const product = PRODUCTS.RO_5110_TEWH;
    const productSlug = generateProductSlug(product.name);

    // Langsung pakai '/' karena baseURL sudah mengarah ke halaman subscription
    await page.goto(SUBSCRIPTION_URL);
    await page.getByRole('link', { name: 'Our Products' }).click();
    
    await landingPage.goToProductDetail(product.id);
    
    await expect(page).toHaveURL(new RegExp(productSlug));
    await expect(page.getByRole('heading', { name: product.name })).toBeVisible();
    
    await cartPage.clickAddSubscription();
    
    await cartPage.assertCartBadgeVisible();
    await cartPage.assertCartCount(1);
  });

  test('add multiple products and verify cart count accumulates', async ({ page }) => {
    test.setTimeout(90000);
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);

    const productsId = [
      PRODUCTS.RO_5110_TEWH.id,
      PRODUCTS.RO_9115.id,
      PRODUCTS.RO_8115.id,
    ];

    await page.goto(SUBSCRIPTION_URL);
    
    for (let i = 0; i < productsId.length; i++) {
      await page.getByRole('link', { name: 'Our Products' }).click();
      await landingPage.goToProductDetail(productsId[i]);
      await cartPage.clickAddSubscription();
      await cartPage.assertCartCount(i + 1);
    }
  });

  test('remove item from cart and verify badge updates', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);

    await page.goto(SUBSCRIPTION_URL);
    await page.getByRole('link', { name: 'Our Products' }).click();
    await landingPage.goToProductDetail(PRODUCTS.RO_5110_TEWH.id);
    await cartPage.clickAddSubscription();
    await cartPage.assertCartCount(1);

    await cartPage.goToCart();
    await cartPage.removeFirstItem();
    await cartPage.confirmDelete(); 
    await cartPage.assertCartEmpty(); // badge hilang atau '0'
  });
  
});