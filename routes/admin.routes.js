// ini bukan front end javascript, jangan di hapus/diotak atik
const express = require("express");
const router = express();
const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

router.get("/products", adminController.getManageProducts);
router.get("/products/new", adminController.getNewProducts);
router.post(
  "/products/new",
  imageUploadMiddleware,
  adminController.createNewProduct
);
router.get("/products/:id", adminController.getUpdateProducts);
router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProducts
);
router.delete("/products/delete/:id", adminController.deleteProduct);

module.exports = router;
