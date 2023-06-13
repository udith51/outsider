const express = require("express")
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.post('/register-provider', async (req, res) => {
    const newProvider = await new Provider(req.body)
    try {
        const savedProvider = await newProvider.save();
        res.status(200).json(savedProvider);
    } catch (e) {
        res.status(500).json(e);
    }
})

app.get('/provider/:category', async (req, res) => {
    const category = req.params.category;
})


app.listen(8000, () => {
    console.log('Backend server is running');
});