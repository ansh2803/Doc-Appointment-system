const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const doctorModel = require('../models/doctorModel');


const registerController = async (req, res) => {
  // return res.status(200).json({ success: true, message: 'login ok' })
  try {
    const existingUser = await userModel.findOne({email:req.body.email})
    if(existingUser){
      return res.status(200).send({message:'user already exist please login', success:false})
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
    const newUser = new userModel(req.body)
    await newUser.save()
    res.status(201).send({success:true, message:'Register Successfully'})

  } catch (error) {
    console.log(error)
    res.status(500).send({success:false, message:`Register Contoller ${error.message}`})

  }
};

//login callback
const loginController = async (req, res) => {
  // return res.status(201).json({ success: true, message: 'register ok' })
  try {
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
      return res.status(200).send({message:'user not found please register', success:false})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch){
      return res.status(200).send({message:'invalid email or password', success:false})
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
    res.status(200).send({message:'login successfully', 
      success:true, 
      token,
      user:{
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isDoctor: user.isDoctor,
        Notification: user.Notification,
        seenNotification: user.seenNotification,
        _id: user._id,

      },
      });
  } catch (error) {
    console.log(error)
    res.status(500).send({success:false, message:`Login Contoller ${error.message}`})

  }
}
const authController = async (req,res)=> {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    if(!user){
      return res.status(200).send({
        message: 'user not found',
        success: false
      })
    }else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isDoctor: user.isDoctor,
          id: user._id,
          Notification: user.Notification,
          seenNotification: user.seenNotification,
        },
    });
  }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'Auth error',
      success: false,
      error
    })
  }
}

const applyDoctorController = async (req,res)=> {
  try {
    const newDoctor = await doctorModel({...req.body, status:'pending'})
    await newDoctor.save()
    const adminUser = await userModel.findOne({isAdmin:true})
    const Notification = adminUser.Notification
    Notification.push({
      type: 'apply-doctor',
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + ' ' + newDoctor.lastName,
        onClickPath: '/admin/doctors'
      }
    })
    await userModel.findByIdAndUpdate(adminUser._id, {Notification: Notification})
    res.status(201).send({
      success:true,
      message:'Doctor account applied successfully'
    })



  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error while applying for doctor',
      error //print error
    })
  }
}   //this is callback function for apply doctor route in this we have req and res
//notification controller
const getAllNotificationController = async (req, res)=> {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    const seenNotification = user.seenNotification
    const Notification = user.Notification
    seenNotification.push(...Notification)
    user.Notification = []
    user.seenNotification = seenNotification
    const updatedUser = await user.save()
    res.status(200).send({
      success: true,
      message: 'all notification marked as read',
      data: updatedUser,
    })


  }
  catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'Error in notification',
      success: false,
      error
    })
  }
}
//Delete all Notifications
const deleteAllNotificationController = async (req,res) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    user.Notification = []
    user.seenNotification = []
    const updatedUser = await user.save()
    res.status(200).send({
      success: true,
      message: 'all notification deleted successfully',
      data: updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'unable to delete all notification',
      success: false,
      error
    })
  }
}


module.exports = { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController }


