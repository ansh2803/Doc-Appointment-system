const doctorModel = require('../models/doctorModel');
const getDoctorInfoConroller = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({message:'Doctor Info Fetched', success:true, data:doctor})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({message:'Error in get doctor info', success:false, error})
    }
}
//update doc profile
const updateProfileController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({message:'Doctor Profile Updated', success:true, data:doctor})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({message:'Error in update profile', success:false, error})
    }
}
module.exports = { getDoctorInfoConroller, updateProfileController }