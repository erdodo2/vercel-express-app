const express = require('express');
const app = express();
const port = process.env.PORT || 80;


require("dotenv").config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const firebaseApi = require('./firebaseApi');
const cors = require('./middleware/cors');
app.use(cors);

const path = require('path');
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.get('/api/:collection/:doc', async (req, res) => {
    res.json(await firebaseApi.getData(req.params.collection, req.params.doc));
})

app.get('/', async (req, res) => {

    res.render('index',{data:await firebaseApi.getData("profile","tr")})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));