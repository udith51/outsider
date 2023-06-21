const express = require("express")
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require('./routes/auth');
const providerRoute = require('./routes/provider');

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

app.use('/auth', authRoute);
app.use('/provider', providerRoute);


// app.get('/provider/:category', async (req, res) => {
//     const category = req.params.category;
//     var providers;
//     try {
//         if (category === "hotel")
//             providers = await ProviderHotel.find();
//         else if (category === "catering")
//             providers = await ProviderCatering.find();
//         else if (category === "banquet")
//             providers = await ProviderBanquet.find();
//         res.status(200).json(providers);

//     } catch (e) {
//         res.status(500).json(e);
//     }
// })


app.listen(3000, () => {
    try {
        console.log('Backend server is running');
    }
    catch (e) {
        console.log(e);
    }
});