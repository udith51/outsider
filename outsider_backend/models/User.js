const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 8 },
        userType: String,//Provider or Customer
        category: String,
        phone: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);