const express = require('express');
const app = express();
const port = process.env.PORT || 80;


require("dotenv").config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const cors = require('./middleware/cors');
app.use(cors);

const path = require('path');
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

const router = require('./router');
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));