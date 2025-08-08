import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js'; 
import { renderCheckoutHeader } from './checkoutHeader.js';

// displays the order summary section in the checkout page
export function renderOrderSummary() {

// each time we loop through the cart, add the HTML to this variable to be displayed later
let cartSummaryHTML = '';

// generating the HTML content for items in the cart in the checkout page
cart.cartItems.forEach((cartItem) => {

  // unique identifier for each cart item
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId); // get the matching product from the products data based on the productId

  const deliveryOptionId = cartItem.deliveryOptionId;

  const deliveryOption = getDeliveryOption(deliveryOptionId); // get the delivery option from the deliveryOptions data based on the deliveryOptionId

  const dataString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
              Delivery Date: ${dataString}
          </div>

          <div class="cart-item-details-grid">
              <img class="product-image"
              src=${matchingProduct.image}>

              <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingProduct.id}">
                      ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingProduct.id}">
                      ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                      <span>
                          Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                          Update
                      </span>
                      <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id=${matchingProduct.id}> 
                      <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingProduct.id}>Save</span>
                      <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                      Delete
                      </span>
                  </div>
              </div>

          <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
          </div>
      </div>
    `;
});

// update the HTML content of the order summary section in the checkout page
const orderSummaryContainer = document.querySelector('.js-order-summary')

if (cart.cartItems.length === 0) {
  orderSummaryContainer.innerHTML = `
    <div>Your cart is empty.</div>
    <a class="button-primary view-products-link" href="amazon.html">View products</a>
  `;
}
else {
  orderSummaryContainer.innerHTML = cartSummaryHTML;
}

// function to generate the HTML content for delivery options
// this will be used to display the delivery options in the checkout page
function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const dataString = calculateDeliveryDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    html += `
        <div class="delivery-option js-delivery-option" data-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
            <input type="radio" ${isChecked ? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dataString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
            </div>
        </div>
    `;
  });
  return html;
}

// add event listeners to the delete links in the checkout page
document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
        // get the product id from the data attribute of the link
        // and remove it from the cart variable in cart.js
        // this will remove the product from the cart
        // and update the cart variable in cart.js
        // also update the cart quantity in the top right corner of the amazon.html page
        const productId = deleteLink.dataset.productId;
        cart.removeFromCart(productId);
        
        // regenerate HTML content for updated cart data
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
        
    });
});

// add event listeners to the update links in the checkout page
document.querySelectorAll('.js-update-link').forEach((updateLink) => {
updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId;

        // give the container a class of is-editing-quantity
        // this will be used to show the input field and save link when clicking the update link
        // this will also hide the quantity label and update link
        // this is done by adding the class to the container with the unique identifier
        // the unique identifier is the productId
        // this will allow us to target the specific cart item container
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');

        renderCheckoutHeader();
    });
});

// add event listeners to the save links in the checkout page
document.querySelectorAll('.js-save-link').forEach((saveLink)=> {
    saveLink.addEventListener('click', () => {
        const productId = saveLink.dataset.productId;
        cart.saveQuantity(productId);

        renderCheckoutHeader();
        renderPaymentSummary();
    });
});

// add event listeners to the quantity input fields in the checkout page:
// when user clicks enter key instead of save link
document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const productId = input.dataset.productId;
            cart.saveQuantity(productId);
            renderCheckoutHeader();
            renderPaymentSummary();
        }
    });
});

// add event listeners to the delivery option elements in the checkout page
// when user changes the delivery option, the page will update the delivery date
document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        // shorthand property for getting the productId and deliveryOptionId from the data attributes
        // const productId = element.dataset.productId;
        // const deliveryOptionId = element.dataset.deliveryOptionId;
        const { productId, deliveryOptionId } = element.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);

        // re-render specific sections to show updated HTML content from the change in data
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary(); 
    });
});
}



