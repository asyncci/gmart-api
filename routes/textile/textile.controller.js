var _ = require("underscore");
var Textile = require("./textile.model");

exports.addTextile = async function (req, res) {
  let textile = new Textile({
    source: req.body.source,
    codeKent: req.body.codeKent,
    codeKent0: req.body.codeKent0,
    codeChina: req.body.codeChina,
    nameRussian: req.body.nameRussian,
    nameChinese: req.body.nameChinese,
    nameEnglish: req.body.nameEnglish,
    subCat: req.body.subCat,
    priceChinaKG: req.body.priceChinaKG,
    priceChinaMeter: req.body.priceChinaMeter,
    width: req.body.width,
    gram: req.body.gram,
    marketPrice: req.body.marketPrice,
    imageURL: req.body.imageURL,
    note: req.body.note,
    currentPrice: req.body.currentPrice,
    isPluff: req.body.isPluff,
    isResToChina: req.body.isResToChina,
    isKentSample: req.body.isKentSample,
    staff: req.body.staff,
    client: req.body.client,
    description: req.body.description,
    isPopular: req.body.isPopular,
    priceUpdated: req.body.priceUpdated,
  });

  try {
    await textile.save();
    res
      .status(200)
      .send({
        success: true,
        message: "Textile added successfully",
        data: textile,
      });
  } catch (error) {
    console.error("Error adding textile:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

exports.editTextile = async function (req, res) {
  if (!req.params.id) {
    return res
      .status(400)
      .send({ success: false, error: "Textile ID required" });
  }

  let updateData = req.body;

  try {
    let updatedTextile = await Textile.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedTextile) {
      return res
        .status(404)
        .send({ success: false, error: "Textile not found" });
    }
    res
      .status(200)
      .send({
        success: true,
        message: "Textile updated successfully",
        data: updatedTextile,
      });
  } catch (error) {
    console.error("Error updating textile:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

exports.deleteTextile = async function (req, res) {
  if (!req.params.id) {
    return res
      .status(400)
      .send({ success: false, error: "Textile ID required" });
  }

  try {
    let deletedTextile = await Textile.findByIdAndDelete(req.params.id);
    if (!deletedTextile) {
      return res
        .status(404)
        .send({ success: false, error: "Textile not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Textile deleted successfully" });
  } catch (error) {
    console.error("Error deleting textile:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

exports.getTextileDetails = async function (req, res) {
  if (!req.params.id) {
    return res
      .status(400)
      .send({ success: false, error: "Textile ID required" });
  }

  try {
    let textile = await Textile.findById(req.params.id);
    if (!textile) {
      return res
        .status(404)
        .send({ success: false, error: "Textile not found" });
    }
    res.status(200).send({ success: true, data: textile });
  } catch (error) {
    console.error("Error fetching textile details:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

exports.getTextiles = async function (req, res) {
  var query = {};

  if (req.query.search) {
    query["$or"] = [
      { nameRussian: new RegExp(req.query.search, "i") },
      { nameChinese: new RegExp(req.query.search, "i") },
      { nameEnglish: new RegExp(req.query.search, "i") },
    ];
  }

  try {
    const textiles = await Textile.find(query).sort({ createdAt: -1 });
    res.status(200).send({ success: true, data: textiles });
  } catch (error) {
    console.error("Error fetching textiles:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
