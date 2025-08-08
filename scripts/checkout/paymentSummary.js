import {cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'; 
import { addOrder } from '../orders.js';

// Function to render the payment summary section in the checkout page
// this function automatically runs when the checkout page loads
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        // loops through each product in the cart and calculates the total price
        // based on the quantity and price of each product
        // also gets the delivery option price for each product
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cart.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;
    
    // update the HTML content of the payment summary section in the checkout page
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    const orderBtn = document.querySelector('.js-place-order');

    if (cart.cartItems.length === 0) {
      orderBtn.classList.add('payment-button-disabled');
    }
    else {
      orderBtn.classList.remove('payment-button-disabled');
    }

    document.querySelector('.js-place-order').addEventListener('click', async () => {
      try {
        // after clicking button, make a request to the backend to create the order. To create an order we need to send our cart to the backend. We will use async/await for handling asynchronous code.
        // second parameter of fetch allows an object to be passsed. It lets you configure how the request should be sent.
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST', // type of request: POST - tells backend to create something, in this case an order
            headers: { // gives the backend more info about our request
                'Content-Type': 'application/json', // tells the backend what type of data to send to backend: in this case json (JS objects)
            },
            body: JSON.stringify({ // actually data to send to backend. Have to convert the object into a str before sending.
              cart: cart
            })
        });

        const order = await response.json(); // gives us the data attached to the response, which should be the order created by the backend. Convert the string into JSON (JS objects).
        addOrder(order);
      }
      catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      // after making an order clear the cart
      cart.cartItems = [];
      cart.saveToStorage();
      
      // this lets us control the URL at the top of the browswer
      // location is a property of window and also an object
      // href is a property of location
      // orders.html replaces everything after the / with orders.html
      window.location.href = 'orders.html';
  });
}