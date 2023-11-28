"use strict";

var express = require("express");
var router = express.Router();

// User Module
var user = require("./users/users.controller");
router.post("/addUser", user.addUser);
router.post("/authUser", user.authUser);
router.get("/getTempUserId", user.getTempUserId);

// Product Module
var product = require("./product/product.controller");
router.get("/getProducts", product.getProducts);
router.get("/getProductDetails/:productId", product.getProductDetails);

// Category Module
var category = require("./category/category.controller");
router.get("/getCategories", category.getCategories);

// Banner Module
var banner = require("./banner/banner.controller");
router.get("/getBanners", banner.getBanners);

// Cart Module
var cart = require("./cart/cart.controller");
router.put("/updateCart/:userId", cart.updateCart);
router.get("/getCart", cart.getCart);

// Setting Module
var setting = require("./setting/setting.controller");
router.get("/getPrivacy", setting.getPrivacy);
router.get("/getTerms", setting.getTerms);
router.get("/getDeliveryLimit", setting.getDeliveryLimit);
router.get("/getDeliveryCharge", setting.getDeliveryCharge);
// Manufacturer Module
var manufacturer = require("./manufacturers/manufacturer.controller");
router.get("/getManufacturers", manufacturer.getManufacturers);
router.get(
  "/getManufacturerById/:manufacturerId",
  manufacturer.getManufacturerById
);
router.post("/addManufacturer", manufacturer.addManufacturer);

// Product Module
var product = require("./product/product.controller");
router.post("/addProduct", product.addProduct);
router.put("/editProduct/:id", product.editProduct);
router.delete("/deleteProduct/:id", product.deleteProduct);
router.get("/getProducts", product.getProducts);

// User Module
var user = require("./users/users.controller");
router.get("/getUsers", user.getUsers);
module.exports = router;
