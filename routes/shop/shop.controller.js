exports.addShop = async function (req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;
    
    if (user._id) {
        console.log(req.body);
        return res.json(req.body);
    }
}

exports.getShop = async function (req, res) {
    return res.json(req.body);
}
