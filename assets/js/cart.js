let server = "http://195.26.245.5:9505/api";

let loginOrLogOut = document.querySelector(".loginOrLogOut");
let loggedIn = localStorage.getItem("loggedIn") === "true" || false;
let subTotalCart = document.querySelector(".subTotalCart");
let totalCart = document.querySelector(".totalCart");

let productsCount = null;
// 37
let productCountInPage = 8;
// 8

let pageSize = null;
// 1 2 3 4 5

let whichPageSelected = 1;

let newElement = loggedIn
  ? `<ul class="logOutList">
    <li> <a class="cartBasket" href="/userproducts.html"><img src="/assets/img/icon/cartbasker.png" alt="cartBasket" /></a></li> </li>
                  <li class="profileIcon"><a href="./profilpage.html"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg></a>
</li>
<li><button class="logOutButton"><p>log out</p></button></li>

                </ul>`
  : `<ul class="loginList">
                  <li> <div class="loginnnnn"> <a href="./logIn.html"><p>log in</p></a> </div> </li>
                </ul>`;

loginOrLogOut.innerHTML = newElement;

let profileIcon = document.querySelector(".profileIcon");

profileIcon &&
  profileIcon.addEventListener("click", () => {
    window.location.href = "/profilpage.html";
  });

let logOutButton = document.querySelector(".logOutButton");

logOutButton &&
  logOutButton.addEventListener("click", () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login.html";
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
              <span class="product-thumb cartImageSpan" aria-hidden="true">
                <img src=${aboutProduct.imageUrl} alt=${aboutProduct.brand}/>
              </span>
              <span class="product-name">${aboutProduct.brand} - ${aboutProduct.model}</span>
            </div>
            <span class="price-col">${aboutProduct.price}$</span>
            <span class="qty-col">
              <input
                type="number"
                class="qty-input quantityInput${aboutProduct.id}"
                value=${aboutProduct.quantity}
                min="1"
                aria-label="Quantity"
                onchange="quantityChange(${aboutProduct.id}, ${aboutProduct.price})"
              />
            </span>
            <span class="subtotal-col subTotalPrice${aboutProduct.id}">${aboutProduct.price * aboutProduct.quantity}$</span>
            <span class="remove-col">
              <button type="button" class="btn btn--remove" onclick="removeFromCart(${aboutProduct.id})">Remove</button>
            </span>`;

    cartProductsShowSection.appendChild(li);
  }
}

showCartProducts();

function quantityChange(id, price) {
  let quantityInput = document.querySelector(".quantityInput" + id);
  let quantityInputValue = Number(quantityInput.value);
  let subTotalPrice = document.querySelector(".subTotalPrice" + id);

  subTotalPrice.innerHTML = quantityInputValue * Number(price) + "$";

  let myCarts = JSON.parse(localStorage.getItem("myCarts")) || {};

  myCarts[id].quantity = quantityInputValue;

  localStorage.setItem("myCarts", JSON.stringify(myCarts));

  getPromotion();
}

function removeFromCart(id) {
  let myCarts = JSON.parse(localStorage.getItem("myCarts")) || {};
  let subTotalPrice = document.querySelector(".subTotalPrice" + id);
  let quantityInput = document.querySelector(".quantityInput" + id);

  if (myCarts[id].quantity > 1) {
    subTotalPrice.innerHTML =
      (myCarts[id].quantity - 1) * myCarts[id].price + "$";
    quantityInput.value = myCarts[id].quantity - 1;

    myCarts[id].quantity -= 1;
  } else {
    delete myCarts[id];
    window.location.reload();
  }

  localStorage.setItem("myCarts", JSON.stringify(myCarts));
  getPromotion();
}

function getPromotion() {
  let totalPriceMyCarts = 0;
  let myCarts = JSON.parse(localStorage.getItem("myCarts")) || {};

  for (let key in myCarts) {
    totalPriceMyCarts =
      totalPriceMyCarts + myCarts[key].price * myCarts[key].quantity;
  }

  let promotion = JSON.parse(localStorage.getItem("promotion"));

  if (promotion) {
    totalCart.innerHTML = totalPriceMyCarts * 0.6;
  } else {
    totalCart.innerHTML = totalPriceMyCarts;
  }

  subTotalCart.innerHTML = totalPriceMyCarts;
}

getPromotion();
