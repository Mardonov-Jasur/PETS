const assert = require("assert");
const Member = require("../models/Member");
const Definer = require("../lib/mistake");
const Product = require("../models/Product");

let storeController = module.exports;

storeController.getMyStoreProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyStoreProducts");
    // TODO: Get my store products

     const product = new Product();
     const data = await product.getAllProductsDataResto(res.locals.member);
     res.render("store-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyStoreProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

storeController.getSignupMyStore = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyStore");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyStore, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

storeController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupDate(data);

    req.session.member = new_member;
    res.redirect("/store/products/menu");
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

storeController.getLoginMyStore = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyStore");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyStore, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

storeController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginDate(data);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/store/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

storeController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("Siz logout sahifasidasiz");
};

storeController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "STORE") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with store type"
    });
};

storeController.checkSessions = (req, res) => {
  if (req.session.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};
