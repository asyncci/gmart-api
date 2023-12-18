var Shop = require('./shop.model');

<<<<<<< HEAD
=======
//without photos
>>>>>>> dfd0a5f (dock)
export async function addShop(req, res) {
    const user = req?.decoded && req?.decoded?.user ? req?.decoded?.user : null;

    if (user._id) {
<<<<<<< HEAD
        const shop = new Shop();
        if (!_.isUndefined(req.body.longitude)) shop.longitude = req.body.longitude;
        if (!_.isUndefined(req.body.latitude)) shop.latitude = req.body.latitude;
=======

        let okay = true;
        let shop = new Shop();

        if (req.body.container) shop.container = req.body.container; else okay = false;
        if (req.body.latitude) shop.latitude = req.body.latitude; else okay = false;
        if (req.body.longitude) shop.longitude = req.body.longitude; else okay = false;
        if (req.body.keywords) {
            if (req.body.keywords.length < 1)
                okay = false;
            shop.keywords = req.body.keywords;
        }
        else okay = false;
        if (req.body.photos) {
            if (req.body.photos.length < 1)
                okay = false;
            shop.photos = req.body.photos;
        }
        else okay = false;
        if (req.body.our) shop.our = req.body.our; else okay = false;

        if (!okay) return res.status(401).send({ success: false, message: 'shop was not added' });

>>>>>>> dfd0a5f (dock)

        await shop.save()
            .then(async (shopObj) => {
                return res.status(200).send({ success: true, message: 'shop added', data: shopObj });
<<<<<<< HEAD
            });
    }

    return res.status(401).send({ success: false, error: 'authentication failed' })
=======
            })
            .catch(async (err) => {
                return res.status(401).send({ success: false, message: 'shop was not added' });
            });
    }

    return res.status(401).send({ success: false, message: "Shop was not added" })
}

export async function getShops(req, res) {
    const shops = await Shop.find({});
    return res.status(200).send({ success: true, shops })
>>>>>>> dfd0a5f (dock)
}

export async function getShop(req, res) {
    if (req?.params?.id) {
        const shop = Shop.findOne({ _id: req?.params?.id })
        if (!shop) return res.status(400).send({ success: false, message: 'invalid shop' });
<<<<<<< HEAD
        
        return res.status(200).send({ success: true, message: 'shop found', data: shop})
=======

        return res.status(200).send({ success: true, message: 'shop found', data: shop })
>>>>>>> dfd0a5f (dock)
    }

    return res.status(401).send({ success: false, error: 'authentication failed' })
}
<<<<<<< HEAD
=======

>>>>>>> dfd0a5f (dock)
