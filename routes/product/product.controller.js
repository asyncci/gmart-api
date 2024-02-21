var _ = require("underscore");
var Product = require("./product.model");
var Cart = require("../cart/cart.model");
var { getLocation } = require("../../lib/core");

exports.addProduct = async function (req, res) {
  let okay = true;
  let product = new Product();

  if (req.body.name) product.name = req.body.name;
  else okay = false;
  if (req.body.description) product.description = req.body.description;
  else okay = false;

  if (req.body.photos) {
    if (req.body.photos.length < 1) okay = false;
    product.photos = req.body.photos;
  } else okay = false;

  if (req.body.manufacturerIds) {
    const allValidIds = req.body.manufacturerIds.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (allValidIds) {
      product.manufacturerIds = req.body.manufacturerIds;
    } else {
      okay = false; // If any ID is not valid, set okay to false
    }
  } else okay = false;
// 
  if (!okay) {
    return res.status(400).send({
      success: false,
      message: "Invalid request. Check required fields.",
    });
  }

  await product
    .save()
    .then(async (productObj) => {
      return res
        .status(200)
        .send({ success: true, message: "Product added", data: productObj });
    })
    .catch(async (err) => {
      console.error("Error adding product:", err);
      return res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    });
};

exports.editProduct = async function (req, res) {
  const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
  if (user._id) {
    if (req?.params?.id) {
      const product = await Product.findOne({ _id: req?.params?.id });
      if (!product)
        return res
          .status(400)
          .send({ success: false, error: "invalid product" });

      var productData = {};
      if (!_.isUndefined(req.body.name)) productData["name"] = req.body.name;
      if (!_.isUndefined(req.body.price)) productData["price"] = req.body.price;
      if (!_.isUndefined(req.body.quantity))
        productData["quantity"] = req.body.quantity;
      if (!_.isUndefined(req.body.categories))
        productData["categories"] = req.body.categories;
      if (!_.isUndefined(req.body.description))
        productData["description"] = req.body.description;
      if (!_.isUndefined(req.body.photos))
        productData["photos"] = req.body.photos;
      if (!_.isUndefined(req.body.popular))
        productData["popular"] = req.body.popular;
      if (!_.isUndefined(req.body.visible))
        productData["visible"] = req.body.visible;
      if (!_.isUndefined(req.body.location)) {
        productData["location"] = req.body.location;
        const geoLocation = await getLocation(req.body.location);
        if (geoLocation && geoLocation.lat && geoLocation.lng)
          productData["locationPoints"] = {
            type: "Point",
            coordinates: [geoLocation.lng, geoLocation.lat],
          };
      }
      if (!_.isUndefined(req.body.additionalDetails))
        productData["additionalDetails"] = req.body.additionalDetails;
      if (!_.isUndefined(req.body.specialPrice))
        productData["specialPrice"] = req.body.specialPrice;

      await Product.updateOne({ _id: req?.params?.id }, { $set: productData })
        .then(async (result) => {
          return res
            .status(200)
            .send({ success: true, message: "product updated" });
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
        .send({ success: false, error: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, error: "Product not found" });
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

  const totalProducts = await Product.find(query).countDocuments();
  const Products = await Product.find(query)
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort({ createdAt: -1 });

  return res.status(200).send({ success: true, Products, totalProducts });
};
