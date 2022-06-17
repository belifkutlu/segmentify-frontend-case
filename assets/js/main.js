let products = [];

fetch(
  "https://raw.githubusercontent.com/belifkutlu/segmentify-frontend-case/master/product-list.json"
)
  .then((response) => response.json())
  .then((productData) => {
    const categories = productData.responses[0][0].params.userCategories;
    const recommendedProducts =
      productData.responses[0][0].params.recommendedProducts;
    const productKeys = Object.keys(recommendedProducts);
    const firstCategoryKey = productKeys[0];

    products = recommendedProducts;

    categories.forEach((category) => {
      const categoriesWrapper = document.getElementsByClassName("tab-bar")[0];
      categoriesWrapper.innerHTML += `
        <div 
          class="tab-bar-item" 
          data-key="${category}" 
          onclick="handleTabClick('${category}')">
          <span>${category}</span>
        </div>`;
    });

    drawSlider(firstCategoryKey);
    selectTabBar(firstCategoryKey);
  });

function handleTabClick(productKey) {
  selectTabBar(productKey);
  drawSlider(productKey);
}

function selectTabBar(productKey) {
  const tabBars = document.querySelectorAll(".tab-bar-item");

  tabBars.forEach(function (tabBar) {
    const dataKey = tabBar.getAttribute("data-key");

    if (dataKey == productKey) {
      tabBar.classList.add("active");
    } else {
      tabBar.classList.remove("active");
    }
  });
}

function drawSlider(productKey) {
  const productsWrapper = document.getElementsByClassName("splide__list");
  let splideList = "";
  products[productKey].forEach(({ name, image, priceText }) => {
    splideList += `
      <div class="splide__slide product-card">
        <img
          class="product-img"
          src="${image}"
          alt=""
        />
        <h3 class="product-title">
          ${name}
        </h3>
        <div class="price"><span>${priceText}</span></div>
        <div class="shipping">
          <img src="./assets/images/shipping.svg" alt="" />
          <span>Ücretsiz Kargo</span>
        </div>
        <button class="add-basket-btn" onclick="addToBasket('${name}')">Sepete Ekle</button>
      </div>
    `;
  });
  productsWrapper[0].innerHTML = splideList;
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

function addToBasket(name) {
  new Noty({
    type: "information",
    layout: "bottomRight",
    text: `${name} adlı ürün sepetine eklendi.`,
    theme: "relax",
    timeout: 2000,
  }).show();
}
