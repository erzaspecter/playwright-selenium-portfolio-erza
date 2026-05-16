const { expect } = require('@playwright/test')

class CartPage {
  constructor(page) {
    this.page = page
    this.cartBadge = page.locator('span.rounded-full')
    this.addSubscriptionButton = page.getByRole('button', { name: 'Add Subscription' })
  }

  async clickAddSubscription() {
    await this.addSubscriptionButton.click()
  }

  async getCartCount() {
    return await this.cartBadge.textContent()
  }

  async assertCartCount(expectedCount) {
    await this.cartBadge.waitFor({ state: 'visible', timeout: 5000 })
    await expect(this.cartBadge).toHaveText(String(expectedCount))
  }

  async assertCartBadgeVisible() {
    await expect(this.cartBadge).toBeVisible({ timeout: 5000 })
  }
}

module.exports = CartPage