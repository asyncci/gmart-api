var Keywords = require('./keyword.model');

export async function getKeywords(req, res) {
    const keywords = [
        'Свитшот',
        'Куртки'
    ];
    return res.status(200).send({ success: true, keywords: keywords })
}
