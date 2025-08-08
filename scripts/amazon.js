import { cart } from '../data/cart-class.js';
import { products, loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
  console.log(products);
  renderProductsGrid();
});

// function to load the products on the amazon home page
function renderProductsGrid() {

  // display products number in cart on top right
  document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

  let productsHTML = '';

  // search bar feature
  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search){
    document.querySelector('.js-search-bar').value = search;
    search = search.toLowerCase();
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search) || product.keyWords.includes(search);
    });
  }

  // if a search doesn't exist the filterproducts would just be the products in general
  // loop through each product and generate the HTML content
  filteredProducts.forEach((product) => {
    // each time loop through products, we will add to productsHTML
    productsHTML += 
      `<div class="product-container">
          <div class="product-image-container">
              <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
              <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
          </div>

          <div class="product-price">
              ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </select>
          </div>

          <!-- example of polymorphism in action. -->
          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
          </button>
      </div>`;
  }); 

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // An object that stores the timeout ids for displaying the added message
  // For example:
  // {
  //   'product-id1': 2,
  //   'product-id2': 5,
  // }
  const addedMessageTimeouts = {};

  // Interactivity when clicking Add to Cart button
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        // get the product id and the product amount. Then add it to the cart variable in cart-class.js
        const productId = button.dataset.productId;
        const productAmount = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        // add the product to the cart
        cart.addToCart(productId, productAmount);

        // update the added to cart number in the top right corner
        document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();

        // display the added to cart message
        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');

        const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);

        // Save the timeoutId for this product
        // so we can stop it later if we need to.
        addedMessageTimeouts[productId] = timeoutId;
      });
  });

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchContent = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${searchContent}`;
  });

  // if user click enter instead of clicking the search button the searching feature still works
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const searchContent = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${searchContent}`;
    }
  });
}