const mongoose = require("mongoose");

const reservationHotelSchema = mongoose.Schema({
    customerId: String,
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    providerId: String,
    id: String,
    stRooms: Number,
    dlRooms: Number,
    stStartDate: Date,
    stEndDate: Date,
    dlStartDate: Date,
    dlEndDate: Date
})

const reservationBanquetSchema = mongoose.Schema({
    customerId: String,
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    providerId: String,
    id: String,
    halls: Number,
    date: Date
})

const reservationCateringSchema = mongoose.Schema({
    customerId: String,
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    providerId: String,
    id: String,
    bsGuests: Number,
    prGuests: Number,
    prPGuests: Number,
    bsStartDate: Date,
    bsEndDate: Date,
    prStartDate: Date,
    prEndDate: Date,
    prPStartDate: Date,
    prPEndDate: Date,
})

module.exports = {
    ReserveHotel: mongoose.model('Reserve_Hotel', reservationHotelSchema),
    ReserveBanquet: mongoose.model('Reserve_Banquet', reservationBanquetSchema),
    ReserveCatering: mongoose.model('Reserve_Catering', reservationCateringSchema)
}