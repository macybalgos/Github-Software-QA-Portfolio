// pages/MenuPage.js
const { expect } = require('@playwright/test');


class MenuPage {
  constructor(page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async isLoginPageVisible() {
    return await this.page.locator('#login-button').isVisible();
  }
}

module.exports = { MenuPage };
