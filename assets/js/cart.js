let server = "http://195.26.245.5:9505/api";

let loginOrLogOut = document.querySelector(".loginOrLogOut");
let loggedIn = localStorage.getItem("loggedIn") === "true" || false;

let productsCount = null;
// 37
let productCountInPage = 8;
// 8

let pageSize = null;
// 1 2 3 4 5

let whichPageSelected = 1;

let newElement = loggedIn
  ? `<ul class="logOutList">
    <li class="profileIcon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg></li>
                  <li><button class="logOutButton">Log Out</button></li>
                </ul>`
  : `<ul class="loginList">
                  <li><a class="loginnnnn" href="./logIn.html">Log in</a></li>
                </ul>`;

loginOrLogOut.innerHTML = newElement;

let profileIcon = document.querySelector(".profileIcon");

profileIcon &&
  profileIcon.addEventListener("click", () => {
    window.location.href = "/profile.html";
  });

let logOutButton = document.querySelector(".logOutButton");

logOutButton &&
  logOutButton.addEventListener("click", () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/logİn.html";
  });

let cartProductsShowSection = document.querySelector(
  ".cartProductsShowSection",
);

function showCartProducts() {
  cartProductsShowSection.innerHTML = "";
  let myCarts = JSON.parse(localStorage.getItem("myCarts")) || {};

  for (let myproduct in myCarts) {
    let aboutProduct = myCarts[myproduct];
    let li = document.createElement("li");
    li.className = "cart-row cart-item";
    li.innerHTML = ` <div class="product-col">
              <span class="product-thumb" aria-hidden="true">
                <img src=${aboutProduct.imageUrl} alt=${aboutProduct.brand}/>
              </span>
              <span class="product-name">${aboutProduct.brand} - ${aboutProduct.model}</span>
            </div>
            <span class="price-col">${aboutProduct.price}$</span>
            <span class="qty-col">
              <input
                type="number"
                class="qty-input"
                value=${aboutProduct.quantity}
                min="1"
                aria-label="Quantity"
              />
            </span>
            <span class="subtotal-col">${aboutProduct.price * aboutProduct.quantity}$</span>
            <span class="remove-col">
              <button type="button" class="btn btn--remove">Remove</button>
            </span>`;

    cartProductsShowSection.appendChild(li);
  }
}

showCartProducts();
