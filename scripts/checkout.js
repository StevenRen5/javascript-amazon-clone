// these are imported functions from other files which acts as modules
// since checkout.js is a module (declared in checkout.html), every file it imports also becomes a module
import { loadProductsFetch } from '../data/products.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js'; 
import { renderPaymentSummary } from './checkout/paymentSummary.js';

async function loadPage() {

  // try the code and if there's an error we can catch it using catch (){}
  // since we are request data in the backend, we will use try on these request
  try {
    // throw 'error1'; can manually create error

    await loadProductsFetch();

  } 
  catch (error) { // if there's an error in try {..} we will run the code inside catch(){}
    // catch has a parameter called error which contains info about the error if we need it
    console.log('Unexpected error. Please try again later.');
    // console.log(error);
  }

  // rnder checkout pages
  renderCheckoutHeader();
  renderOrderSummary(); 
  renderPaymentSummary(); 
}
loadPage();

