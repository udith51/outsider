const mongoose = require("mongoose");

const providerSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        categories: [String],
        banquet: {
            name: String,
            add1: String,
            add2: String,
            city: String,
            state: String,
            pincode: String,
            accomodation: Number,
            price: Number,
            facilities: [String],
            pictures: [String]
        },
    },
    {
        timestamps: true
    }
)

const providerCateringSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        catering: {
            basicAmt: Number,
            premiumAmt: Number,
            premiumPlusAmt: Number,
            mocktailAmt: Number,
            serves: String,
            city: String,
            state: String,
        },
    },
    {
        timestamps: true
    }
)

const providerHotelSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        hotel: {
            name: String,
            add1: String,
            add2: String,
            city: String,
            state: String,
            pincode: String,
            standardAmt: Number,
            deluxAmt: Number,
            rooms: Number,
        }
    },
    {
        timestamps: true
    }
)
module.exports = {
    ProviderHotel: mongoose.model('Provider_Hotel', providerHotelSchema),
    ProviderCatering: mongoose.model('Provider_Catering', providerCateringSchema),
    ProviderBanquet: mongoose.model('Provider_Banquet', providerSchema)
}