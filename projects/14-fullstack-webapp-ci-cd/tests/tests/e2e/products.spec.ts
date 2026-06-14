import { test, expect } from '@playwright/test'

test.describe('Product Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should display product list', async ({ page }) => {
    await expect(page.getByText('RO 5110 TEWH')).toBeVisible()
    await expect(page.getByText('Seamless Go')).toBeVisible()
  })

  test('should add product to cart', async ({ page }) => {
    const addToCartBtn = page.getByRole('button', { name: /Add to Cart/i })
    await addToCartBtn.first().click()
    
    // Verify cart count increased
    const cartCount = page.locator('[data-testid="cart-count"]')
    await expect(cartCount).toHaveText('1')
  })

  test('should navigate to product detail', async ({ page }) => {
    await page.click('text=RO 5110 TEWH')
    await expect(page).toHaveURL(/.*products\/1/)
    await expect(page.getByText('Water Purifier')).toBeVisible()
  })
})

test.describe('API Tests', () => {
  test('GET /api/products should return products', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/products')
    expect(response.status()).toBe(200)
    
    const products = await response.json()
    expect(products).toHaveLength(2)
    expect(products[0]).toHaveProperty('name', 'RO 5110 TEWH')
  })

  test('POST /api/cart should add item', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/cart', {
      data: { productId: 1, quantity: 2 }
    })
    expect(response.status()).toBe(201)
  })
})