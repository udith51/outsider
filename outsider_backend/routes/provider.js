const router = require('express').Router();
const { ProviderHotel, ProviderCatering, ProviderBanquet } = require("../models/Provider")

router.post('/register/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var newProvider;
        if (category === "hotel")
            newProvider = await new ProviderHotel(req.body)
        else if (category === "catering")
            newProvider = await new ProviderCatering(req.body);
        else if (category === "banquet")
            newProvider = await new ProviderBanquet(req.body);
        res.status(200).json(newProvider);
    const savedProvider = await newProvider.save();
    res.status(200).json(savedProvider);
    } catch (e) {
        return res.status(500).json(e);
    }
})
module.exports = router;

// console.log(category);

// try {
    
//     res.status(200).json(savedProvider);
// } catch (e) {
//     res.status(500).json(e);
// }

