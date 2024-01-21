const express = require("express");
const router_bssr = express.Router();
const storeController = require("./controllers/storeController");
const productController = require("./controllers/productController");

/***********************************
 *           BSSR EJS              *
 ***********************************/


/**Store Controller */
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
  .get("/products/menu", storeController.getMyStoreData)
  .post(
    "/products/create",
    storeController.validateAuthRestaurant,
    productController.addNewProduct
  )
  .post("/products/edit/:id", productController.updateChosenProduct);

module.exports = router_bssr;
