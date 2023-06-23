const mongoose = require("mongoose");

const providerBanquetSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        add1: String,
        add2: String,
        city: String,
        state: String,
        zipcode: String,
        accomodation: Number,
        price: Number,
        facilities: [String],
        pictures: [String],
        reservations: [{
            cId: String,
            fDate: Date,
            tDate: Date,
        }]
    },
    {
        timestamps: true
    }
)

const providerCateringSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        city: String,
        state: String,
        basicAmt: Number,
        premiumAmt: Number,
        premiumPlusAmt: Number,
        mocktailAmt: Number,
        pictures: [String],
        reservations: [{
            cId: String,
            serves: Number,
            service: String,
            fDate: Date,
            tDate: Date
        }]
    },
    {
        timestamps: true
    }
)

const providerHotelSchema = mongoose.Schema(
    {
        id: String,
        name: String,
        add1: String,
        add2: String,
        city: String,
        state: String,
        pincode: String,
        standardAmt: Number,
        deluxeAmt: Number,
        standardRooms: Number,
        deluxeRooms: Number,
        pictures: [String],
        reservations: [{
            cId: String,
            fDate: Date,
            tDate: Date,
            rooms: Number
        }]
    },
    {
        timestamps: true
    }
)
module.exports = {
    ProviderHotel: mongoose.model('Provider_Hotel', providerHotelSchema),
    ProviderCatering: mongoose.model('Provider_Catering', providerCateringSchema),
    ProviderBanquet: mongoose.model('Provider_Banquet', providerBanquetSchema)
}