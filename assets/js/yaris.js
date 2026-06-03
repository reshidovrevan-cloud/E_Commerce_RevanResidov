// const emailInput = document.getElementById("emailInput");
// const sendBtn = document.getElementById("sendBtn");
// const errorMsg = document.getElementById("errorMsg");

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// sendBtn.addEventListener("click", function () {
//   const emailValue = emailInput.value.trim();

//   if (emailValue === "") {
//     errorMsg.textContent = "Zehmet olmasa email daxil edin.";
//     errorMsg.style.color = "yellow";
//   } else if (!emailRegex.test(emailValue)) {
//     errorMsg.textContent = "Duzgun email daxil edin!!! (mes. rrevan@gamil.com)";
//     errorMsg.style.color = "yellow";
//   } else {
//     errorMsg.textContent = "Email qebul edildi";
//     errorMsg.style.color = "green";
//   }
// });

// emailInput.addEventListener("input", function () {
//   errorMsg.textContent = "";
// });

const products = [
  {
    imageUrl: "./assets/image/oyun.png",
    brand: "HAVIT",
    model: "HV-G92 Gamepad",
    currentPrice: "$120",
    oldPrice: "$160",
    starUrl: "./assets/image/star.png",
  },
  {
    imageUrl: "./assets/image/klavye.png",
    brand: "AK-900",
    model: "Wired Keyboard",
    currentPrice: "$960",
    oldPrice: "$1160",
    starUrl: "./assets/image/star.png",
  },
  {
    imageUrl: "./assets/image/tele.png",
    brand: "IPS LCD",
    model: "Gaming Monitor",
    currentPrice: "$370",
    oldPrice: "$400",
    starUrl: "./assets/image/star.png",
  },
  {
    imageUrl: "./assets/image/ses.png",
    brand: "RGB liquid",
    model: "CPU Cooler",
    currentPrice: "$160",
    oldPrice: "$170",
    starUrl: "./assets/image/star.png",
  },
];

let productContainer = document.querySelector(".product-container");

productContainer.innerHTML = "";

products.forEach((product) => {
  productContainer.innerHTML += `
    <div class="product-card">
      <img src="${product.imageUrl}" alt="${product.brand}" />
      <h3 class="product-title">${product.brand} ${product.model}</h3>
      <div class="price-box">
        <span class="current-price">${product.currentPrice}</span>
        <span class="old-price">${product.oldPrice}</span>
      </div>
      <div class="rating-box">
        <div class="stars">
          <img src="${product.starUrl}" alt="rating" />
        </div>
      </div>
    </div>
  `;
});
