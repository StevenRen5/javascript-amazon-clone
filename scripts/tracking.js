import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {getOrder} from './orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import { cart } from '../data/cart-class.js';
import {skipSatSun} from '../data/deliveryOptions.js';

async function renderTrackingPage(){

  await loadProductsFetch(); // loads the product from the backend into the products variable

  document.querySelector('.js-cart-quantity').innerText = cart.calculateCartQuantity();

  // window.location.href gets the URL at the top of the browswer
  // the URL class analyzes the URL we give it and breaks it down into different parts including a URL parameter (key-value pairs)
  const url = new URL(window.location.href);
  // .searchParams.gets the URL parameter in the URL
  const orderId = url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like the estimated delivery time
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id){
      productDetails = details;
    }
  });

  // calculation for updating progression bar
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTimeRaw = dayjs(productDetails.estimatedDeliveryTime); // this date we got from the backend doesn't skip sat and sun so we will have to fix below
  const deliveryTime = skipSatSun(deliveryTimeRaw);
  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;


  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryTime.format('dddd, MMMM D')}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${(percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${percentProgress}%"></div>
    </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}
renderTrackingPage();