// pages/CartPage.js
const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItem = page.locator('.cart_item');
  }

  async verifyItemInCart() {
    await this.cartItem.waitFor();
    return await this.cartItem.isVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
