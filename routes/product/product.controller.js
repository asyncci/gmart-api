<<<<<<< HEAD
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

    const product = await Product.findById(productId).populate(
      "manufacturerId"
    );

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
=======
var _ = require('underscore');
var Product = require('./product.model');
var Cart = require('../cart/cart.model');
var { getLocation } = require('../../lib/core');

exports.addProduct = async function (req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null
    if (user._id) {
        if (req.body.name && !_.isUndefined(req.body.price) && req.body.quantity) {
            var productData = new Product();
            productData.name = req.body.name
            productData.price = req.body.price
            productData.quantity = req.body.quantity
            if(!_.isUndefined(req.body.categories)) productData.categories = req.body.categories
            if(!_.isUndefined(req.body.description)) productData.description = req.body.description
            if(!_.isUndefined(req.body.photos)) productData.photos = req.body.photos
            if(!_.isUndefined(req.body.popular)) productData.popular = req.body.popular
            if(!_.isUndefined(req.body.visible)) productData.visible = req.body.visible
            if(!_.isUndefined(req.body.location)) {
                productData.location = req.body.location
                const geoLocation = await getLocation(req.body.location)
                if(geoLocation && geoLocation.lat && geoLocation.lng) productData.locationPoints = { type: 'Point', coordinates: [geoLocation.lng, geoLocation.lat] }
            }
            if(!_.isUndefined(req.body.additionalDetails)) productData.additionalDetails = req.body.additionalDetails
            productData.specialPrice = !_.isUndefined(req.body.specialPrice) ? req.body.specialPrice : req.body.price

            await productData.save()
            .then(async (productObj) => {
                return res.status(200).send({ success: true, message: 'product added', data: productObj });
            })
            .catch(err => {
                return res.status(500).send({ success: false, error: 'internal server error' })
            })
        } else {
            return res.status(400).send({ success: false, error: 'invalid details' })
        }
    } else {
        return res.status(401).send({ success: false, error: 'authentication failed' })
    }
}

exports.editProduct = async function (req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null
    if (user._id) {
        if(req?.params?.id) {
            const product = await Product.findOne({ _id: req?.params?.id })
            if (!product) return res.status(400).send({ success: false, error: 'invalid product' })

            var productData = {}
            if(!_.isUndefined(req.body.name)) productData['name'] = req.body.name
            if(!_.isUndefined(req.body.price)) productData['price'] = req.body.price
            if(!_.isUndefined(req.body.quantity)) productData['quantity'] = req.body.quantity
            if(!_.isUndefined(req.body.categories)) productData['categories'] = req.body.categories
            if(!_.isUndefined(req.body.description)) productData['description'] = req.body.description
            if(!_.isUndefined(req.body.photos)) productData['photos'] = req.body.photos
            if(!_.isUndefined(req.body.popular)) productData['popular'] = req.body.popular
            if(!_.isUndefined(req.body.visible)) productData['visible'] = req.body.visible
            if(!_.isUndefined(req.body.location)) {
                productData['location'] = req.body.location
                const geoLocation = await getLocation(req.body.location)
                if(geoLocation && geoLocation.lat && geoLocation.lng) productData['locationPoints'] = { type: 'Point', coordinates: [geoLocation.lng, geoLocation.lat] }
            }
            if(!_.isUndefined(req.body.additionalDetails)) productData['additionalDetails'] = req.body.additionalDetails
            if(!_.isUndefined(req.body.specialPrice)) productData['specialPrice'] = req.body.specialPrice

            await Product.updateOne({ _id: req?.params?.id }, { $set: productData })
            .then(async (result) => {
                return res.status(200).send({ success: true, message: 'product updated' })
            })
            .catch(err => {
                return res.status(500).send({ success: false, error: 'internal server error' })
            })
        } else {
            return res.status(400).send({ success: false, error: 'productId required' })
        }
    } else {
        return res.status(401).send({ success: false, error: 'authentication failed' })
    }
}

exports.deleteProduct = async function (req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null
    if (user._id) {
        if(req?.params?.id) {
            const product = await Product.findOne({ _id: req?.params?.id })
            if (!product) return res.status(400).send({ success: false, error: 'invalid product' })

            await Cart.updateMany({ 'products.productId': product?._id }, { $pull: { products: { productId: product?._id }}})

            await Product.deleteOne({ _id: req.params.id })
            .then(async () => {
                return res.status(200).send({ success: true, message: 'product deleted' })
            })
            .catch(err => {
                return res.status(500).send({ success: false, error: 'internal server error' })
            })
        } else {
            return res.status(400).send({ success: false, error: 'productId required' })
        }
    } else {
        return res.status(401).send({ success: false, error: 'authentication failed' })
    }
}

exports.getProducts = async function (req, res) {
    var sort = { createdAt: -1 }

    if(req.query.sortBy === 'HTL') sort = { specialPrice: -1 }
    else if(req.query.sortBy === 'LTH') sort = { specialPrice: 1 }
    else if(req.query.sortBy === 'popularity') sort = { popular: -1 }
    else if(req.query.sortBy === 'alphabetical') sort = { name: 1 }

    var query = { '$and': [] }

    if(!req.query.all) query['$and'].push({ 'visible': true })

    if(req.query.categoryId) query['$and'].push({ 'categories': req.query.categoryId })

    if(req.query.type && req.query.type == 'popular') query['$and'].push({ 'popular': true })

    if(req.query.location) {
        const geoLocation = await getLocation(req.query.location)
        if(geoLocation && geoLocation.lat && geoLocation.lng) {
            query['$and'].push({ 'locationPoints': { 
                '$near': { 
                    '$geometry': { 
                        'type': "Point" , 
                        'coordinates': [geoLocation.lng, geoLocation.lat]
                    }, 
                    '$maxDistance': 10000
                } 
            }})
        }
    }

    if (req.query.search) {
        const searchQuery = { '$or': [{ 'name': new RegExp(".*" + req.query.search.trim().replace(/(\W)/g, "\\$1") + ".*", "i") }] }
        query['$and'].push(searchQuery)
    }

    if(query['$and'].length <= 0) delete query['$and'];

    console.log(query['$and'], "query['$and']")

    const totalProduct = await Product.find(query).count()
    const products = await Product.find(query).populate('categories', '_id name').skip(req.query.skip).limit(req.query.limit).sort(sort)

    return res.status(200).send({ success: true, products, totalProduct })
}

exports.getProductDetails = async function (req, res) {
    if(req?.params?.productId) {
        const product = await Product.findOne({ _id: req?.params?.productId }).populate('categories', '_id name')
        if(product && product._id) {
            return res.status(200).send({ success: true, product })
        } else {
            return res.status(400).send({ success: false, message: 'product not found' })
        }
    } else {
        return res.status(400).send({ success: false, message: 'productId required' })
    }
}
>>>>>>> dfd0a5f (dock)
