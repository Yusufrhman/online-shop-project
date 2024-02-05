// ini bukan front end javascript, jangan di hapus/diotak atik

const updateCartFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartBadgeElement = document.querySelector(".badge");
const totalPriceElement = document.querySelector("#total-price");

async function updateCart(event) {
  event.preventDefault();
  const formElement = event.target;
  const productId = formElement.dataset.productid;
  const csrfToken = formElement.dataset.csrf;
  const newQuantity = +formElement.firstElementChild.value;
  const totalPrice = +totalPriceElement.innerHTML;
  const price = +formElement.dataset.price;
  const newTotalItemPrice = +newQuantity * price;
  const totalItemPriceElement = formElement
    .closest(".cart-item")
    .querySelector(".cart-item-info span p span");
  const totalItemPrice = +totalItemPriceElement.innerHTML;
  let response;
  try {
    response = await fetch("/cart/update", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
        newQuantity: newQuantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return alert("something went wrong!");
  }
  if (!response.ok) {
    return alert("something went wrong!");
  }
  if (newQuantity <= 0) {
    return formElement.parentElement.remove();
  }
  totalItemPriceElement.textContent = newTotalItemPrice;
  console.log(totalPriceElement.innerHTML);
  console.log(totalItemPrice);
  console.log(newTotalItemPrice);
  totalPriceElement.innerHTML = totalPrice - totalItemPrice + newTotalItemPrice;
  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}

for (updateCartFormElement of updateCartFormElements) {
  updateCartFormElement.addEventListener("submit", updateCart);
}
