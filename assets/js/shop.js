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

let shopCategories = document.querySelector(".shopCategories");

async function getCategories() {
  try {
    let categories = await fetch(`${server}/categories`);
    let cleanCategoris = await categories.json();

    cleanCategoris.forEach((category) => {
      let li = document.createElement("li");
      // Node
      li.addEventListener("click", () => {
        getFilterByCategory(category.id);
      });
      li.innerHTML = `<a href="#" class="active">${category.name}</a>`;

      shopCategories.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

getCategories();

function showProducts(products) {
  console.log(products);

  productShowSection.innerHTML = "";
  products
    .filter((product) => product.imageUrl !== "")
    .forEach((product) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <div class="product-img">
              <img
                src="${product.imageUrl}"
                alt="${product.model}"
              />
            </div>
            <div class="product-info">
              <h4 class="product-title">${product.brand} - ${product.model}</h4>
              <p class="product-price">${product.price}$</p>
              <div class="product-rating">
                <span class="stars-gold">★★★★★</span>
                <span class="review-count">(62)</span>
              </div>
              <button class="btn-add">add to cart</button>
            </div>
        `;
      div.className = "product-card";

      productShowSection.appendChild(div);

      let img = div.querySelector(".product-img img");

      img.addEventListener("error", () => {
        div.remove();
      });
    });
}

let productShowSection = document.querySelector(".productShowSection");

async function getProducts() {
  try {
    let products = await fetch(`${server}/products`);

    let cleanProducts = await products.json();

    console.log(cleanProducts);

    productsCount = cleanProducts.length;

    showPagination();

    showProducts(cleanProducts);
  } catch (error) {
    console.log(error);
  }
}

getProducts();

async function getFilterByCategory(categoryId) {
  console.log(categoryId);

  try {
    let products = await fetch(
      `${server}/products/filter?categoryId=${categoryId}&page=${whichPageSelected - 1}&size=${productCountInPage}`,
      // 0
    );

    let cleanProducts = await products.json();

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  }
}

async function getFilterByRating(productRating) {
  try {
    let products = await fetch(
      `${server}/products/filter?rating=${productRating}&page=${whichPageSelected - 1}&size=${productCountInPage}`,
    );

    let cleanProducts = await products.json();

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  }
}

function getAllProducts() {
  getProducts();
}

let sortByRating = document.querySelector("#sortByRating");
let sortByPrice = document.querySelector("#sortByPrice");

async function getSortingByOption(optionValue, descOrAsc) {
  try {
    let products = await fetch(
      `${server}/products/filter?sortField=${optionValue}&sortDir="ASC"&page=${whichPageSelected - 1}&size=${productCountInPage}`,
    );

    let cleanProducts = await products.json();

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  }
}

let searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("change", () => {
  getProductsBySearch();
});

async function getProductsBySearch() {
  let searchInputValue = searchInput.value;
  try {
    let products = await fetch(
      `${server}/products/filter?search=${searchInputValue}&page=${whichPageSelected - 1}&size=${productCountInPage}`,
    );

    let cleanProducts = await products.json();

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  }
}

let generalSearch = document.querySelector("#generalSearch");
let generalSearchIcon = document.querySelector(".generalSearchIcon");

generalSearch.addEventListener("change", () => {
  getGeneralSearch();
});

generalSearchIcon.addEventListener("click", () => {
  getGeneralSearch();
});

async function getGeneralSearch() {
  let generalSearchValue = generalSearch.value;
  try {
    let products = await fetch(
      `${server}/products/filter?search=${generalSearchValue}&page=${whichPageSelected - 1}&size=${productCountInPage}`,
    );

    let cleanProducts = await products.json();

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  } finally {
    generalSearch.value = "";
  }
}

let paginationList = document.querySelector(".paginationList");

function showPagination() {
  for (let i = 0; i < Math.ceil(productsCount / productCountInPage); i++) {
    let li = document.createElement("li");
    if (i === 0) li.classList.add("active");

    li.innerHTML = i + 1;
    paginationList.appendChild(li);
  }

  getPaginatedProducts(1, productCountInPage);

  let paginationListElement = document.querySelectorAll(".paginationList li");

  paginationListElement.forEach((liElement) => {
    liElement.addEventListener("click", (e) => {
      let clickedElement = e.target;
      clickedElement.classList.add("active");

      getSelectedPage(e.target.innerHTML);

      paginationListElement.forEach((li) => {
        if (li !== clickedElement) li.classList.remove("active");
      });
    });
  });
}

function getSelectedPage(whichPage) {
  whichPageSelected = whichPage;

  getPaginatedProducts(whichPageSelected, productCountInPage);
}

async function getPaginatedProducts(page, size) {
  try {
    let products = await fetch(
      `${server}/products/filter?page=${page - 1}&size=${size}`,
    );

    let cleanProducts = await products.json();

    console.log(cleanProducts);

    showProducts(cleanProducts.content);
  } catch (error) {
    console.log(error);
  }
}
