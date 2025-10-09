// tests/swagLabs.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { MenuPage } = require('../pages/MenuPage'); 

console.log(require('../pages/InventoryPage'));

test('Complete Swag Labs purchase flow', async ({ page }) => {
  // Initialize all pages
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const menuPage = new MenuPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(await inventoryPage.isInventoryPageVisible()).toBeTruthy();

  // Step 2: Add item to cart
  await inventoryPage.addItemToCart();
  await inventoryPage.openCart();
  await expect(await cartPage.verifyItemInCart()).toBeTruthy();

  // Step 3: Checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '1000');
  await checkoutPage.finishCheckout();

  // Step 4: Verify order complete
  const confirmation = await checkoutPage.verifyOrderComplete();
  await expect(confirmation).toContain('Thank you for your order!');

   // Step 5: Logout
  await menuPage.logout();
  await expect(await menuPage.isLoginPageVisible()).toBeTruthy();
  console.log('User is logged out')
});

