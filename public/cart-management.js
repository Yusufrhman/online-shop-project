// ini bukan front end javascript, jangan di hapus/diotak atik

const addCartButtonElement = document.querySelector("#product-details button");
const cartBadgeElement = document.querySelector(".badge");

async function addToCart() {
  let response;
  const productId = addCartButtonElement.dataset.productid;
  const csrfToken = addCartButtonElement.dataset.csrf;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
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
  
  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}


addCartButtonElement.addEventListener("click", addToCart);
