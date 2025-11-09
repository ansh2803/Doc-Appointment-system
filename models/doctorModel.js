const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, "first name is require"],
    },
    lastName: {
        type: String,
        required: [true, "last name is require"],
    
    },
    phone: {
        required: [true, "phone number is require"]
    },
    email: {
        type: String,
        required: [true, "email is require"],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "address is require"],
    },
    specialization: {
        type: String,
        required: [true, "specialization is require"],
    },
    experience: {
        type: String,
        required: [true, "experience is require"],
    },
    feesPerCunsaltation: {
        type: Number,
        required: [true, "fees per cunsaltation is require"],
    },
    timings: {
        type: Object,
        required: [true, "timings is require"],
    },
},{ timestamps: true}
);

const doctorModel = mongoose.model("users", doctorSchema);
module.exports = doctorModel;