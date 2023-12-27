const router = require('express').Router();
const { sendClientMessage, sendProviderMessage } = require('../lib/twilio');
const { ReserveHotel, ReserveCatering, ReserveBanquet } = require("../models/Reservation");

router.post('/', async (req, res) => {
    try {
        for (var idx in req.body.cartItem) {
            var category = req.body.cartItem[idx].category.toLowerCase();
            var newReservation;
            if (category === "hotel")
                newReservation = await new ReserveHotel(req.body.cartItem[idx]);
            else if (category === "catering")
                newReservation = await new ReserveCatering(req.body.cartItem[idx]);
            else if (category === "banquet")
                newReservation = await new ReserveBanquet(req.body.cartItem[idx]);
            // sendClientMessage(req.body.cartItem[idx].name);
            // sendProviderMessage(req.body.cartItem[idx].customerName);
            await newReservation.save();
        } return res.status(200).send("Done");
    } catch (e) {
        return res.status(500).send(e);
    }
})

router.get("/:category/:id", async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var booking;
        if (category === "hotel")
            booking = await ReserveHotel.find({ providerId: req.params.id })
        else if (category === "catering")
            booking = await ReserveCatering.find({ providerId: req.params.id });
        else if (category === "banquet")
            booking = await ReserveBanquet.find({ providerId: req.params.id });
        res.status(200).json(booking);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;