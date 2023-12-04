var _ = require("underscore");
var Product = require("./product.model");
var Cart = require("../cart/cart.model");
const Manufacturer = require("../manufacturers/manufacturer.model"); // Import the Manufacturer model

var { getLocation } = require("../../lib/core");

exports.addProduct = async function (req, res) {
  const { name, price, description, photos, productId } = req.body;

  const productData = new Product({
    name,
    price,
    description,
    photos,
    productId,
  });
  try {
    const productObj = await productData.save();
    return res
      .status(200)
      .send({ success: true, message: "product added", data: productObj });
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, error: "internal server error" });
  }
};
exports.editProduct = async function (req, res) {
  const user = req?.decoded?.user || null;

  if (!user._id) {
    return res
      .status(401)
      .send({ success: false, error: "authentication failed" });
  }

  const productId = req?.params?.id;

  if (!productId) {
    return res
      .status(400)
      .send({ success: false, error: "productId required" });
  }

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(400).send({ success: false, error: "invalid product" });
    }

    const { name, price, description, photos, productId } = req.body;

    const productData = {};

    if (name) productData["name"] = name;
    if (price) productData["price"] = price;
    if (description) productData["description"] = description;
    if (photos) productData["photos"] = photos;
    if (visible) productData["productId"] = productId;
    await Product.updateOne({ _id: productId }, { $set: productData });

    return res.status(200).send({ success: true, message: "product updated" });
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, error: "internal server error" });
  }
};

exports.deleteProduct = async function (req, res) {
  const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
  if (user._id) {
    if (req?.params?.id) {
      const product = await Product.findOne({ _id: req?.params?.id });
      if (!product)
        return res
          .status(400)
          .send({ success: false, error: "invalid product" });

      await Cart.updateMany(
        { "products.productId": product?._id },
        { $pull: { products: { productId: product?._id } } }
      );

      await Product.deleteOne({ _id: req.params.id })
        .then(async () => {
          return res
            .status(200)
            .send({ success: true, message: "product deleted" });
        })
        .catch((err) => {
          return res
            .status(500)
            .send({ success: false, error: "internal server error" });
        });
    } else {
      return res
        .status(400)
        .send({ success: false, error: "productId required" });
    }
  } else {
    return res
      .status(401)
      .send({ success: false, error: "authentication failed" });
  }
};

exports.getProductDetails = async function (req, res) {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res
        .status(400)
        .send({ success: false, error: "Manufacturer ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, error: "Manufacturer not found" });
    }

    return res.status(200).send({ success: true, data: product });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};
exports.getProducts = async function (req, res) {
  var query = {};

  if (req.query.search)
    query["name"] = new RegExp(
      ".*" + req.query.search.trim().replace(/(\W)/g, "\\$1") + ".*",
      "i"
    );

  try {
    const totalProducts = await Product.find(query).countDocuments();
    const products = await Product.find(query)
      .populate("manufacturerId") // Populate the manufacturerId field with actual manufacturer data
      .skip(parseInt(req.query.skip))
      .limit(parseInt(req.query.limit))
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).send({ success: true, products, totalProducts });
  } catch (err) {
    return res
      .status(500)
      .send({ success: false, error: "internal server error" });
  }
};
