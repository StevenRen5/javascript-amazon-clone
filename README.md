# Amazon Clone Project

This project is a multi-page Amazon clone website built using **HTML**, **CSS**, and **JavaScript**. I created it by following the [SuperSimpleDev 22-hour JavaScript course](https://www.youtube.com/watch?v=EerdGm-ehJQ), which helped me level up my frontend development skills by building a realistic online shopping site (Amazon).

> **Note:** The HTML and CSS code was provided as the starting template. My main work focused on implementing the **JavaScript functionality** to make the site interactive and fully functional.

## Features

- Multi-page structure including:  
  - `amazon.html` (products page)  
  - `checkout.html` (checkout page)  
  - `orders.html` (orders page)  
  - `tracking.html` (order tracking page)

- **amazon.html (Products Page):**  
  - Displays a list of products with images, names, prices, etc.
  - Users can select quantities and add products to the cart
  - When a product is added to the cart, a confirmation message popup appears 
  - Cart icon at the top right updates dynamically to show the current cart quantity (available in all four webpages)
  - Search bar to filter products by name

- **checkout.html (Checkout Page):**  
  - Shows all products currently in the cart  
  - Users can update quantities or delete products from the cart  
  - Delivery options selection with varying costs  
  - Payment summary section displaying total cost breakdown
  - Place order button that directs user to the Orders Page

- **orders.html (Orders Page):**  
  - Displays all past orders including order date, total cost, and order ID  
  - Option to “Buy Again” for any previous order’s products  
  - Button to navigate to the tracking page for each order

- **tracking.html (Tracking Page):**  
  - Displays the delivery time, product name, quantity, and image for each order  
  - Includes a visual progress bar indicating delivery stages such as Preparing, Shipped, and Delivered


## Learning Outcomes

Through this project, I:

- Learned the basics of **Git**, including initializing a repository with git init and updating project code by committing changes over time.
- Practiced using **modules** with `export` and `import` to organize code effectively and avoid naming conflicts.
- Integrated external libraries such as **dayjs()** for date/time management.
- Used JavaScript’s **DOM** (`document.querySelector()` etc.) to dynamically generate and update HTML elements across all pages, including product listings, cart summaries, order summaries, and tracking details.
- Applied **Model-View-Controller (MVC)** principles with functions like `renderCheckoutHeader()`, `renderOrderSummary()`, and `renderPaymentSummary()` in `checkout.js` to manage UI rendering cleanly as an alternative to JavaScript's DOM.
- Designed and implemented **Object-Oriented Programming (OOP)** concepts using classes and inheritance:  
  - `Product` as a parent class with `Clothing` and `Appliance` as child classes  
  - A `Cart` class holding related properties and methods for managing cart items
- Used **fetch** and **asynchronous JavaScript** including `callbacks`, `Promises`, and `async/await` to interact with backend URLs and retrieve product and order data for the Products and Orders page.
- Utilized browser **localStorage** to save and maintain cart data between webpages

---

[View Website](https://stevenren5.github.io/javascript-amazon-clone/amazon.html)
