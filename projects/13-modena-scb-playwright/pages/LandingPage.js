class LandingPage {
  constructor(page) {
    this.page = page
  }

  async clickProductById(productId) {
    // await this.page
    //   .locator('h3.text-\\[18px\\].font-semibold')
    //   .filter({ hasText: productName })
    //   .click()
    //await this.page.getByRole('labelText', { name: productId }).click()
    await this.page.getByText(productId, 
      { exact: true }).first().click()

  }

  async addSubscription() {
    await this.page.getByRole('button', { name: 'Add Subscription' }).click();
  }

  // Convenience method: langsung klik produk lalu add to cart
  async goToProductDetail(productId) {
    await this.clickProductById(productId)
  }


}

module.exports = LandingPage