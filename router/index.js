const express = require('express');
const router = express.Router();
const firebaseApi = require('../firebaseApi');

const profile = require('./profile');

router.get('/api/:collection/:doc', async (req, res) => {
    res.json(await firebaseApi.getData(req.params.collection, req.params.doc));
})

router.use("/api/project/", profile);


router.get('/', async (req, res) => {

    res.render('index',{data:await firebaseApi.getData("profile","tr")})
});

module.exports = router;