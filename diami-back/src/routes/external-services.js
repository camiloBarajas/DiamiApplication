const axios = require('axios').default;
const express = require('express');

const app = express();
const apiKey = process.env.ENV_API_KEY_NEWS || '02cb4cd473a94772b3065e1e5ead1751';

/**
 * Método GET para consultar noticias
 */
app.get('/news', async function (req, res) {

    const { country } = req.query;

    if (!country) {
        return res.status(400).json({
            ok: false,
            err: 'El campo country es requerido'
        });
    }

    const news = await axios
        .get(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`);

    if (news.status !== 200) {
        return res.json({
            ok: false,
            err: news.statusText
        });
    }

    res.json({
        ok: true,
        message: 'Consulta de noticias exitosa',
        data: news.data
    });
});

module.exports = app;