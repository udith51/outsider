const router = require('express').Router();
const { ProviderHotel, ProviderCatering, ProviderBanquet } = require("../models/Provider")
var multer = require("multer");
const { storage, cloudinary } = require('../cloudinary')
var upload = multer({ storage })

router.post('/register/:category', upload.array("pictures", 12), async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();

        var newProvider;
        if (category === "hotel")
            newProvider = await new ProviderHotel(req.body)
        else if (category === "catering")
            newProvider = await new ProviderCatering(req.body);
        else if (category === "banquet")
            newProvider = await new ProviderBanquet(req.body);
        newProvider.pictures = req.files.map(f => ({ url: f.path, filename: f.filename }));
        const savedProvider = await newProvider.save();
        return res.status(200).json(savedProvider);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.get('/info/:category/:id', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var provider;
        if (category === "hotel")
            provider = await ProviderHotel.findOne({ serviceId: req.params.id })
        else if (category === "catering")
            provider = await ProviderCatering.findOne({ serviceId: req.params.id });
        else if (category === "banquet")
            provider = await ProviderBanquet.findOne({ serviceId: req.params.id });
        return res.status(200).json(provider);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.get('/update-info/:category/:pid', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        var provider;
        if (category === "hotel")
            provider = await ProviderHotel.findOne({ providerId: req.params.pid })
        else if (category === "catering")
            provider = await ProviderCatering.findOne({ providerId: req.params.pid });
        else if (category === "banquet")
            provider = await ProviderBanquet.findOne({ providerId: req.params.pid });
        return res.status(200).json(provider);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.patch('/update-info/:category/:pid', upload.array("pictures", 12), async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        if (req.files.length !== 0)
            var provider;
        if (category === "hotel")
            provider = await ProviderHotel.findOne({ providerId: req.params.pid });
        else if (category === "catering")
            provider = await ProviderCatering.findOne({ providerId: req.params.pid });
        else if (category === "banquet")
            provider = await ProviderBanquet.findOne({ providerId: req.params.pid });
        await provider.updateOne(req.body);
        if (req.files.length !== 0)
            await provider.updateOne({
                $set: {
                    pictures: req.files.map(f => ({ url: f.path, filename: f.filename }))
                }
            });
        return res.status(200).json("Details updated");
    } catch (e) {
        console.log(e);
    }
})

router.put('/info/:category/:id', async (req, res) => {
    try {
        const updatedObj = req.body;
        const { category } = req.params;
        var provider;
        if (category === "hotel")
            provider = await ProviderHotel.updateOne({ id: req.params.id }, { $set: updatedObj })
        else if (category === "catering")
            provider = await ProviderCatering.updateOne({ id: req.params.id }, { $set: updatedObj });
        else if (category === "banquet")
            provider = await ProviderBanquet.updateOne({ id: req.params.id }, { $set: updatedObj });
        return res.status(200).json(provider);
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
