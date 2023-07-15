const router = require('express').Router();
const { ReserveHotel, ReserveCatering, ReserveBanquet } = require("../models/Reservation");

router.post('/', async (req, res) => {

    try {
        for (var idx in req.body.cartItem) {
            // console.log(req.body.cartItem[idx].category);
            var category = req.body.cartItem[idx].category.toLowerCase();
            console.log(req.body.cartItem[idx]);
            var newReservation;
            if (category === "hotel")
                newReservation = await new ReserveHotel(req.body.cartItem[idx]);
            else if (category === "catering")
                newReservation = await new ReserveCatering(req.body.cartItem[idx]);
            else if (category === "banquet")
                newReservation = await new ReserveBanquet(req.body.cartItem[idx]);
            console.log(newReservation);
            await newReservation.save();
        } return res.status(200).send("Done");
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error");
    }
})

module.exports = router;