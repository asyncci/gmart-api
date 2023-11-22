var _ = require("underscore");
var Manufacturer = require("./manufacturer.model");

// exports.addManufacturer = async function (req, res) {
//   const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
//   if (user._id) {
//     if (user.role && user.role === "admin") {
//       if (req.body.name) {
//         var manufacturerData = new Manufacturer();
//         manufacturerData.name = req.body.name;

//         if (!_.isUndefined(req.body.keywords))
//           manufacturerData.keywords = req.body.keywords;
//         if (!_.isUndefined(req.body.description))
//           manufacturerData.description = req.body.description;

//         await manufacturerData
//           .save()
//           .then(async (manufacturerObj) => {
//             return res
//               .status(200)
//               .send({
//                 success: true,
//                 message: "Manufacturer added",
//                 data: manufacturerObj,
//               });
//           })
//           .catch((err) => {
//             return res
//               .status(500)
//               .send({ success: false, error: "Internal server error" });
//           });
//       } else {
//         return res
//           .status(400)
//           .send({ success: false, error: "Invalid details" });
//       }
//     } else {
//       return res
//         .status(400)
//         .send({ success: false, error: "Only admin can add Manufacturer" });
//     }
//   } else {
//     return res
//       .status(401)
//       .send({ success: false, error: "Authentication failed" });
//   }
// };

// without token

exports.addManufacturer = async function (req, res) {
  try {
    const { name, keywords, description, photos } = req.body;

    if (!name) {
      return res.status(400).send({ success: false, error: "Invalid details" });
    }

    const manufacturerData = new Manufacturer({
      name,
      keywords,
      description,
      photos,
    });

    const manufacturerObj = await manufacturerData.save();

    return res.status(200).send({
      success: true,
      message: "Manufacturer added",
      data: manufacturerObj,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

//   withouot token above
exports.editManufacturer = async function (req, res) {
  const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
  if (user?._id) {
    if (user.role && user.role === "admin") {
      if (req?.params?.id) {
        const manufacturer = await Manufacturer.findOne({
          _id: req?.params?.id,
        });
        if (!manufacturer)
          return res
            .status(400)
            .send({ success: false, error: "Invalid manufacturer" });

        var manufacturerData = {};
        if (!_.isUndefined(req.body.name))
          manufacturerData["name"] = req.body.name;
        if (!_.isUndefined(req.body.keywords))
          manufacturerData["keywords"] = req.body.keywords;
        if (!_.isUndefined(req.body.description))
          manufacturerData["description"] = req.body.description;
        await Manufacturer.updateOne(
          { _id: req?.params?.id },
          { $set: manufacturerData }
        )
          .then(async (result) => {
            return res
              .status(200)
              .send({ success: true, message: "Manufacturer updated" });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ success: false, error: "Internal server error" });
          });
      } else {
        return res
          .status(400)
          .send({ success: false, error: "Manufacturer ID required" });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, error: "Only admin can edit Manufacturer" });
    }
  } else {
    return res
      .status(401)
      .send({ success: false, error: "Authentication failed" });
  }
};

exports.deleteManufacturer = async function (req, res) {
  const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
  if (user?._id) {
    if (user.role && user.role === "admin") {
      if (req?.params?.id) {
        const manufacturer = await Manufacturer.findOne({
          _id: req?.params?.id,
        });
        if (!manufacturer)
          return res
            .status(400)
            .send({ success: false, error: "Invalid manufacturer" });

        await Manufacturer.deleteOne({ _id: req.params.id })
          .then(async () => {
            return res
              .status(200)
              .send({ success: true, message: "Manufacturer deleted" });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ success: false, error: "Internal server error" });
          });
      } else {
        return res
          .status(400)
          .send({ success: false, error: "Manufacturer ID required" });
      }
    } else {
      return res
        .status(400)
        .send({ success: false, error: "Only admin can delete Manufacturer" });
    }
  } else {
    return res
      .status(401)
      .send({ success: false, error: "Authentication failed" });
  }
};

exports.getManufacturers = async function (req, res) {
  var query = {};

  if (req.query.search)
    query["name"] = new RegExp(
      ".*" + req.query.search.trim().replace(/(\W)/g, "\\$1") + ".*",
      "i"
    );

  const totalManufacturers = await Manufacturer.find(query).countDocuments();
  const manufacturers = await Manufacturer.find(query)
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .send({ success: true, manufacturers, totalManufacturers });
};
