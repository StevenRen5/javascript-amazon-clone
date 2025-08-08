import formatCurrency from "../scripts/utils/money.js";

// gets the product based on the productId
export function getProduct(productId) {
  let matchingProduct;

  // loops throug each product and finds the matching product based on productId
  // save the matching product to the matchingProduct variable
  // now we can use this variable to generate the HTML content for the cart item in checkout.js
  products.forEach((product) => {
      if (product.id === productId) {
          matchingProduct = product;
      }
  });
  return matchingProduct;
}

// Product class (parent class)
export class Product { 
  id;
  image;
  name; 
  rating;
  priceCents;
  keyWords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keyWords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

// Clothing is a child class of the parent class Product
export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a><a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

// code to convert the product list of objects into product class instances (objects generated from a class)
// productDetails is a single product object from the products list

// loading products from the backend

export let products = [];

export function loadProductsFetch() {
  // The entire fetch chain below is a Promise. 
  // Step 1: fetch() sends a request to the backend and returns a Promise.
  // When that promise resolves, it gives us a Response object.
  const promise = fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      // Step 2: When the response arrives, we extract the JSON data from it.
      // response.json() is asynchronous and returns a Promise that resolves with the actual data.
      return response.json();
    })
    .then((productsData) => {
      // Step 3: Once the JSON data is ready, we process it.
      // Convert each product detail into a class instance based on its type.
      products = productsData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        } else if (productDetails.type === 'appliance') {
          return new Appliance(productDetails);
        }
        // If type doesn't match the above, fall back to the base Product class.
        return new Product(productDetails);
      });

      // Optional: confirm products are loaded and processed.
      console.log('load products');
    })/*.catch((error) => {
      console.log('unexpected error. Please try again later.');
    }); */

  // Return the entire Promise chain so others can wait for it if needed.
  return promise;
}