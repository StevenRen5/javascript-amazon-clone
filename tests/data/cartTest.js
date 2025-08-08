import {cart} from '../../data/cart-class.js';

describe('test suite: addtoCart', () => {

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    // Spy on localStorage.setItem to prevent actual changes to browser storage and allow us to verify if it gets called correctly during the test.
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 3,
      deliveryOptionId: '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(3);
  });

  // About this test:
  // Mock localStorage.getItem to simulate an empty cart being loaded.
  // This ensures loadFromStorage() sets cart to an empty array,
  // allowing us to test adding a new product to an empty cart.
  it('adds a new product to the cart', () => {
    // mock localStorage.getItem() first to return an empty array.
    // reload the cart by running loadFromStorage(), where the cart will now be an empty cart (empty array)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    cart.cartItems = [];

    // now we add a product to a cart, the cart.length will be 1 now
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    // this should pass
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId : '1'
    }]));
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});



describe('test suite: removeFromCart', () => {

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('remove a productId that is in the cart', () => {

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
    }]));

  });

  it('does nothing if product not in cart', () => {

    cart.cartItems = [{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }];

    cart.removeFromCart('does-not-exist');
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
      }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }]));

  });
});