const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const cors = require('cors');
app.use(cors({origin:"http://localhost:3000", credentials:true}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./config/mongoose.config');
require('./routes/artchive.routes')(app);

app.listen(port, ()=> console.log(`Listening on port: ${port}`));