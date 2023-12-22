var Keywords = require('./keyword.model');

exports.getKeywords = async function(req, res) {
    const keywords = [
        'Свитшот',
        'Куртки',
        'Кофты',
        'Свитеры',
        'Штаны',
        'Шорты',
        'Шланги',
        'Насосы',
        'Свитшот',
        'Куртки',
        'Кофты',
        'Свитеры',
        'Штаны',
        'Шорты',
        'Шланги',
        'Насосы',
    ];
    return res.status(200).send({ success: true, keywords: keywords })
}
