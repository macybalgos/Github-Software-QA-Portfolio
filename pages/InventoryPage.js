// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addItemToCart() {
    await this.addToCartButton.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async isInventoryPageVisible() {
    return await this.page.locator('.inventory_list').isVisible();
  }
}

module.exports = { InventoryPage };
