const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: String,
        email: { type: String, required: true, unique: true },
        password: String,
        userType: String,//Provider or Customer
        category: String,
        phone: String
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);