const express = require("express")
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { ProviderHotel, ProviderCatering, ProviderBanquet } = require("../outsider_backend/models/Provider")

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

app.post('/register-provider/:category', async (req, res) => {
    console.log(req.body);
    const category = req.params.category.toLowerCase();
    console.log(category);
    var newProvider;
    try {
        if (category === "hotel")
            newProvider = await new ProviderHotel(req.body)
        else if (category === "catering")
            newProvider = await new ProviderCatering(req.body);
        else if (category === "banquet")
            newProvider = await new ProviderBanquet(req.body);

        const savedProvider = await newProvider.save();
        res.status(200).json(savedProvider);
    } catch (e) {
        res.status(500).json(e);
    }
})

app.get('/provider/:category', async (req, res) => {
    const category = req.params.category;
    var providers;
    try {
        if (category === "hotel")
            providers = await ProviderHotel.find();
        else if (category === "catering")
            providers = await ProviderCatering.find();
        else if (category === "banquet")
            providers = await ProviderBanquet.find();
        res.status(200).json(providers);

    } catch (e) {
        res.status(500).json(e);
    }
})


app.listen(3000, () => {
    try {
        console.log('Backend server is running');
    }
    catch (e) {
        console.log(e);
    }
});