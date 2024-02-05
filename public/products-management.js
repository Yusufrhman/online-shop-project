
// ini bukan front end javascript, jangan di hapus/diotak atik
const DeleteButtonElements = document.querySelectorAll(
  ".product-item-actions button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;
  const response = await fetch("/admin/products/delete/" + productId + "?_csrf=" + csrfToken, {
    method: "DELETE",
  });
  if (!response.ok) {
    return alert("something went wrong!");
  }
    buttonElement.parentElement.parentElement.parentElement.remove()
}

for (DeleteButtonElement of DeleteButtonElements) {
  DeleteButtonElement.addEventListener("click", deleteProduct);
}
