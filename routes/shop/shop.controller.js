var Shop = require('./shop.model');

export async function addShop(req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;

    if (user._id) {
        const shop = new Shop();
        if (!_.isUndefined(req.body.longitude)) shop.longitude = req.body.longitude;
        if (!_.isUndefined(req.body.latitude)) shop.latitude = req.body.latitude;

        await shop.save()
            .then(async (shopObj) => {
                return res.status(200).send({ success: true, message: 'shop added', data: shopObj });
            });
    }

    return res.status(401).send({ success: false, error: 'authentication failed' })
}

export async function getShop(req, res) {
    if (req?.params?.id) {
        const shop = Shop.findOne({ _id: req?.params?.id })
        if (!shop) return res.status(400).send({ success: false, message: 'invalid shop' });
        
        return res.status(200).send({ success: true, message: 'shop found', data: shop})
    }

    return res.status(401).send({ success: false, error: 'authentication failed' })
}
