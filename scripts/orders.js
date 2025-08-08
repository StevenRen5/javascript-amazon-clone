import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import formatCurrency from './utils/money.js';
import { skipSatSun } from '../data/deliveryOptions.js';
import { cart } from '../data/cart-class.js';
import { loadProductsFetch, getProduct } from '../data/products.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  // this adds the order to the front of the array. Since in real world, the most recent order displays first.
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

async function renderOrdersPage() {

await loadProductsFetch(); // loads the product

let ordersHTML = '';

document.querySelector('.js-cart-quantity').innerText = cart.calculateCartQuantity();

orders.forEach((order) => {

  const orderDate = dayjs(order.orderTime).format('MMMM D');

  ordersHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${formatCurrency(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${productsListHTML(order)}
      </div>
    </div> 
  `;
});

function productsListHTML(order) {
  let productsListHTML = '';

  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    const deliveryTimeRaw = dayjs(productDetails.estimatedDeliveryTime); // this date we got from the backend doesn't skip sat and sun so we will have to fix below
    const deliveryTime = skipSatSun(deliveryTimeRaw);

    productsListHTML += `
      <div class="product-image-container">
        <img src="${product.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arrive on ${deliveryTime.format('MMMM D')}
        </div>
        <div class="product-quantity">
          Quantity: ${productDetails.quantity}
        </div>
        <button class="buy-again-button button-primary  js-buy-again-button" data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  return productsListHTML;
}

document.querySelector('.orders-grid').innerHTML = ordersHTML;

const buyAgainBtn = document.querySelectorAll('.js-buy-again-button');
buyAgainBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    cart.addToCart(btn.dataset.productId, 1);
    document.querySelector('.js-cart-quantity').innerText = cart.calculateCartQuantity();
    btn.innerHTML = 'Added';
    setTimeout(() => {
      btn.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      `;
    }, 1000);
  });
});
}
renderOrdersPage();

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
