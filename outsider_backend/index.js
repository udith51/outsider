const express = require("express")
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require('./routes/auth');
const providerRoute = require('./routes/provider');
const reservationRoute = require('./routes/reserve');

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Error");
    })

app.use('/auth', authRoute);
app.use('/provider', providerRoute);
app.use('/reserve', reservationRoute);


app.listen(3000, () => {
    try {
        console.log('Backend server is running');
    }
    catch (e) {
        console.log(e);
    }
});