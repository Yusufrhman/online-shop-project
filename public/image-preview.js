const imageInputElement = document.querySelector("#image-upload-control input");
const imagePreviewElement = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  let files = imageInputElement.files;
  if (!files || files.length === 0) {
    return (imagePreviewElement.style.display = 'none');
  }
  const pickedImage = files[0];
    imagePreviewElement.src = URL.createObjectURL(pickedImage);
    imagePreviewElement.style.display = 'block'
}

imageInputElement.addEventListener("change", updateImagePreview);
