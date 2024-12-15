document.addEventListener("DOMContentLoaded", () => {
  // Global Variable
  const productTitle = document.querySelector(".product-title").textContent;
  const colorButtons = document.querySelectorAll('input[name="product-color"]');
  const productThumbnail = document.getElementById("productImage");
  const qtyInputContainers = document.querySelectorAll(".qty-input-container");
  const addToCartBtn = document.querySelector(".c-button");
  const stickyCheckOut = document.querySelector(".checkout-sticky");
  const productQuantityInput = document.querySelector(".product-qty");
  const cartModalBody = document.querySelector(".render-table-item");
  const cartTotalQuantity = document.querySelector(".modal-total-quantity");
  const cartTotalAmount = document.querySelector(".modal-total-amount");

  let cartCount = 0;
  let totalAmount = 0;
  let totalQuantity = 0;

  // Update Thumbnail Image
  colorButtons.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const newImageSrc = e.target.getAttribute("data-image");
      if (newImageSrc) {
        productThumbnail.src = newImageSrc;
      }
    });
  });

  // Handle Quantity Changes
  qtyInputContainers.forEach((container) => {
    const minusBtn = container.querySelector(".qty-count--minus");
    const plusBtn = container.querySelector(".qty-count--add");
    const qtyInputField = container.querySelector(".product-qty");

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(qtyInputField.value, 10);
      if (currentValue > parseInt(qtyInputField.min, 10)) {
        qtyInputField.value = currentValue - 1;
      }
    });

    plusBtn.addEventListener("click", () => {
      const currentValue = parseInt(qtyInputField.value, 10);
      if (currentValue < parseInt(qtyInputField.max, 10)) {
        qtyInputField.value = currentValue + 1;
      }
    });

    qtyInputField.addEventListener("input", () => {
      let value = parseInt(qtyInputField.value, 10);
      if (isNaN(value) || value < parseInt(qtyInputField.min, 10)) {
        qtyInputField.value = qtyInputField.min;
      } else if (value > parseInt(qtyInputField.max, 10)) {
        qtyInputField.value = qtyInputField.max;
      }
    });
  });

  // Add Product to Cart
  addToCartBtn.addEventListener("click", () => {
    const quantity = parseInt(productQuantityInput.value);
    const selectedColorInput = document.querySelector(
      'input[name="product-color"]:checked'
    );
    const selectedColorValue =
      selectedColorInput?.getAttribute("data-color") || "N/A";
    const selctedSizeInput = document.querySelector(
      'input[name="product-size"]:checked'
    );
    const selectedSizeValue =
      selctedSizeInput?.getAttribute("data-size") || "N/A";
    const selectedSizeAmount =
      selctedSizeInput?.getAttribute("data-amount") || "N/A";
    const selectedColorImage =
      selectedColorInput?.getAttribute("data-image") || "N/A";

    if (quantity > 0) {
      const product = {
        title: productTitle,
        color: selectedColorValue,
        size: selectedSizeValue,
        image: selectedColorImage,
        quantity,
        totalPrice: selectedSizeAmount * quantity,
      };

      cartCount += 1;
      stickyCheckOut.querySelector("span").textContent = cartCount;
      stickyCheckOut.style.opacity = "1";
      stickyCheckOut.style.bottom = "20px";

      totalQuantity += quantity;
      totalAmount += selectedSizeAmount * quantity;

      updateCart(product);

      cartTotalQuantity.textContent = totalQuantity;
      cartTotalAmount.textContent = totalAmount.toFixed(2);
    }
  });

  function updateCart(product) {
    const productRow = `
      <tr>
        <td class="d-flex align-items-center">
          <div class="product-prev-img"><img src="${
            product.image
          }" alt="Product image"></div>
          <span class="p-title-wrap">${product.title}</span>
        </td>
        <td class="text-center"><strong>${product.color}</strong></td>
        <td class="text-center"><strong>${product.size}</strong></td>
        <td class="text-center"><strong>${product.quantity}</strong></td>
        <td class="text-end"><strong>$${product.totalPrice.toFixed(
          2
        )}</strong></td>
      </tr>`;
    cartModalBody.insertAdjacentHTML("beforeend", productRow);
  }
});
