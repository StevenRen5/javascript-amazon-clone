class Cart {
  // cartItems = undefined;
  // localStorageKey = undefined;
  // shortcut to writing property with undefined values:
  cartItems;
  #localStorageKey;

  // constructor is a method that automatically runs when an object is created
  constructor(localStorageKey) {
    // provides a key because it is undefined
    this.#localStorageKey = localStorageKey;

    // loads the cart storage when this page runs
    this.#loadFromStorage(); 
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
      // [{
      //     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      //     quantity: 2,
      //     deliveryOptionId: '1'
      // }, {
      //     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      //     quantity: 1,
      //     deliveryOptionId: '2'
      // }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, productAmount) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if (matchingItem){
        matchingItem.quantity += productAmount;
    }
    else {
        this.cartItems.push({
            productId: productId,
            quantity: productAmount,
            deliveryOptionId: '1' // default delivery option
        });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    // update the cart with the new array
    // this will remove the product from the cart
    this.cartItems = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    // loops through cart to find total quantity to display on the amazon.html cart image (top right)
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        } 
    });
    this.saveToStorage();
  }

  saveQuantity(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    // removes the is-editing-quantity class from the container
    // this reverses all the changes made when clicking the update link
    // this will hide the input field and save link
    // and show the quantity label and update link
    container.classList.remove('is-editing-quantity');

    // get the input field value and update the quantity label
    // this will update the quantity label with the new value
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    if (!(newQuantity >= 0 && newQuantity < 1000)) {
        alert('Quantity must be between 0 and less than 1000');
        return; // exit the function if the quantity is not valid
    } 

    // updates the quantity of the product in the cart
    // this will update the cart variable in cart.js
    cart.updateQuantity(productId, newQuantity);

    // update the quantity label with the new value
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId){ 
            matchingItem = cartItem;
        }
    });
    
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}
// generates a new object using our class, and the obj will have all the properties and methods
// constructor of the Cart class takes a parameter and that is the localStoragekey to identify the specific cart's localstorage
export const cart = new Cart('cart-oop'); 
// const businessCart = new Cart('cart-business');


