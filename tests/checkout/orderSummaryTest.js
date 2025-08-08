import {renderOrderSummary } from '../../scripts/checkout/orderSummary.js'; 
import { cart } from '../../data/cart-class.js';
import { loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {


  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // runs the function before all of the tests
  // done is a function provided by jasmine. Now beforeAll() will not go to the next step until done is called
  beforeAll( async () => {
    await loadProductsFetch();
  }); 

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
  
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual("Intermediate Size Basketball");
    // expect(document.querySelector(`js-product-price-${productId1}`).innertext).toEqual('$10.90');
    // expect(document.querySelector(`js-product-price-${productId2}`).innertext).toEqual('$20.95');

    // sets the HTML to '' so that after done with test and satisfied
    // the HTML doesn't appear anymore 
  });

  it('removes a product', () => {
    // .click() is a JS built-in function
    // we can get the HTML element and attach a .click() to it 
    // this automatically clicks the delete button for us 
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // checks that there's only one js cart item container since we deleted the first one
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

    // checks that this product is removed from the page
    // expect it to be null
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

    // checks second cart item is still on the page
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

    // checks if cart array is updated
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);

    // checks if product name matches
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual("Intermediate Size Basketball");

    // checks if product price matches
    // expect(document.querySelector(`js-product-price-${productId2}`).innertext).toEqual('$20.95');


  });
});