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
        const savedProvider = await newProvider.save();
        return res.status(200).json(savedProvider);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.get('/all/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var items;
        if (category === "hotel")
            items = await ProviderHotel.find();
        else if (category === "catering")
            items = await ProviderCatering.find();
        else if (category === "banquet")
            items = await ProviderBanquet.find();
        return res.json(items);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get('/:category/:id', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var item;
        if (category === "hotel") {
            item = await ProviderHotel.findById(req.params.id);
        } else if (category === "catering") {
            item = await ProviderCatering.findById(req.params.id);
        } else if (category === "banquet") {
            item = await ProviderBanquet
                .findById(req.params.id);
        }
        return res.json(item);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;
