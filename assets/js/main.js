let products = null;

fetch(
  "https://raw.githubusercontent.com/belifkutlu/segmentify-frontend-case/master/product-list.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (productData) {
    const categories = productData.responses[0][0].params.userCategories;
    const recommendedProducts =
      productData.responses[0][0].params.recommendedProducts;
    const firstCategory = categories[0];

    products = recommendedProducts;

    drawCategories(categories);
    drawSlider(firstCategory);
  });

function drawCategories(categories) {
  categories.forEach(function (category, index) {
    const categoriesWrapper = document.querySelector(".tab-bar");

    categoriesWrapper.innerHTML += `
    <div
      class="tab-bar-item ${index === 0 ? "active" : ""}"
      onclick="handleClick('${category}', this)">
      <span>${category}</span>
    </div>`;
  });
}

function drawSlider(productKey) {
  const productArray = products[productKey];
  const productsWrapper = document.querySelector(".splide__list");

  productsWrapper.innerHTML = "";

  productArray.forEach(function (product) {
    productsWrapper.innerHTML += `
      <div class="splide__slide product-card">
        <img
          class="product-img"
          src="${product.image}"
          alt=""
        />
        <h3 class="product-title">
          ${product.name}
        </h3>
        <div class="price"><span>${product.priceText}</span></div>
        <div class="shipping">
          <img src="./assets/images/shipping.svg" alt="" />
          <span>Ücretsiz Kargo</span>
        </div>
        <button class="add-basket-btn" onclick="addToBasket('${product.name.replaceAll(
          '"',
          ""
        )}')">Sepete Ekle</button>
      </div>
    `;
  });

  mountSlider();
}

function mountSlider() {
  new Splide(".splide", {
    perPage: 4,
    pagination: false,
    width: "80%",
    gap: 20,
    lazyLoad: "nearby",
    padding: {
      left: 10,
      right: "10%",
    },
    breakpoints: {
      768: {
        perPage: 2,
        width: "100%",
        arrows: false,
        gap: 10,
        trimSpace: true,
        padding: {
          left: 10,
          right: "15%",
        },
      },
    },
  }).mount();
}

function addToBasket(title) {
  new Noty({
    type: "information",
    layout: "bottomRight",
    text: `${title} adlı ürün sepetine eklendi.`,
    theme: "relax",
    timeout: 2000,
  }).show();
}

function selectTabBar(element) {
  const tabBars = document.querySelectorAll(".tab-bar-item");

  tabBars.forEach(function (tabBar) {
    tabBar.classList.remove("active");
  });

  element.classList.add("active");
}

function handleClick(productKey, element) {
  selectTabBar(element);
  drawSlider(productKey);
}
