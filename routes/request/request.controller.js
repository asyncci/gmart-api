// Import dependencies and models
var Request = require("./request.model"); // Adjust the path as needed

// CREATE a new Request
// CREATE a new Request
exports.createRequest = async function (req, res) {
  let okay = true;
  let request = new Request();

  // Required fields
  if (req.body.title) request.title = req.body.title;
  else okay = false;

  if (req.body.requestDescription)
    request.requestDescription = req.body.requestDescription;
  else okay = false;

  if (req.body.textileDescription)
    request.textileDescription = req.body.textileDescription;
  else okay = false;

  if (req.body.price) request.price = req.body.price;
  else okay = false;

  if (req.body.time) request.time = req.body.time;
  else okay = false;

  if (req.body.paymentMethod) request.paymentMethod = req.body.paymentMethod;
  else okay = false;

  if (req.body.amount) request.amount = req.body.amount;

  if (req.body.photos) {
    if (req.body.photos.length < 1) okay = false;
    request.photos = req.body.photos;
  } else okay = false;

  if (!okay) {
    return res.status(400).send({
      success: false,
      message: "Invalid request. Check required fields.",
    });
  }

  try {
    let requestObj = await request.save();
    return res
      .status(200)
      .send({ success: true, message: "Request added", data: requestObj });
  } catch (error) {
    console.error("Error adding request:", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

// READ all Requests
exports.getRequests = async function (req, res) {
    try {
      const requests = await Request.find({});
  
      const total = await Request.countDocuments();
  
      return res.status(200).send({ success: true, total: total, requests: requests });
    } catch (error) {
      return res.status(500).send({ success: false, message: "Internal server error" });
    }
  };
  
// READ a single Request by ID
exports.getRequestById = async function (req, res) {
  try {
    const requestId = req.params.id;
    const request = await Request.findById(requestId);

    if (!request) {
      return res
        .status(404)
        .send({ success: false, message: "Request not found" });
    }

    return res.status(200).send({ success: true, data: request });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

// UPDATE a Request
exports.updateRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    const updateData = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true }
    );

    if (!updatedRequest) {
      return res
        .status(404)
        .send({ success: false, message: "Request not found" });
    }

    return res
      .status(200)
      .send({
        success: true,
        message: "Request updated",
        data: updatedRequest,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

exports.deleteRequest = async function (req, res) {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Request.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res
        .status(404)
        .send({ success: false, message: "Request not found" });
    }

    return res.status(200).send({ success: true, message: "Request deleted" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

module.exports = exports;
