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

  async goToCart() {
    await this.cartBadge.click()  }

  async goToCheckout() {
    await this.page.getByRole('link', { name: 'View Subscription Status' }).click();
  }

  async removeFirstItem() {
    // Implementasi untuk menghapus item pertama dari cart
    await this.page.getByRole('button', { name: 'remove' }).first().click();
  }
  async confirmDelete() {
    // Klik tombol dengan teks "Delete"
    await this.page.getByRole('button', { name: 'Delete' }).click();
  }

  async assertCartEmpty() {
    await expect(this.cartBadge).toBeHidden({ timeout: 5000 })
  }

}

module.exports = CartPage