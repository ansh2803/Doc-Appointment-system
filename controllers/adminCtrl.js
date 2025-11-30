const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModel')


const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({message:'Users Data List', success:true, data:users})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Error in get all users', success:false, error})
    }
}
const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({message:'Doctors Data List', success:true, data:doctors})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Error in get all doctors', success:false, error})
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user = await userModel.findOne({_id: doctor.userId})
        const Notification = user.Notification
        Notification.push({
            type: 'doctor-account-status-updated',
            message: `Your doctor account has been ${status}`,
            onClickPath: '/notifications'
        })
        user.isDoctor === 'approved' ? true : false
        await user.save()
        // await userModel.findByIdAndUpdate(user._id, {isDoctor: user.isDoctor, Notification})
        res.status(200).send({message:'Account status updated', success:true, data:doctor})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Error in change account status', success:false, error})
    }
}
module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusController }