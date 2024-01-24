const express = require("express");
const router_bssr = express.Router();
const storeController = require("./controllers/storeController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer,js")("products");


/***********************************
 *           BSSR EJS              *
 ***********************************/

/**Store Controller */
router_bssr.get("/", storeController.home);
router_bssr
  .get("/signup", storeController.getSignupMyStore)
  .post("/signup", storeController.signupProcess);
router_bssr
  .get("/login", storeController.getLoginMyStore)
  .post("/login", storeController.loginProcess);
router_bssr.get("/logout", storeController.logout);
router_bssr.get("/check-me", storeController.checkSessions);

/**Product controller */
router_bssr
  .get("/products/menu", storeController.getMyStoreProducts)
  .post(
    "/products/create",
    storeController.validateAuthRestaurant,
    uploader_product.array("product_images", 5),
    productController.addNewProduct
  )
  .post(
    "/products/edit/:id",
    storeController.validateAuthRestaurant,
    productController.updateChosenProduct
  );

module.exports = router_bssr;
