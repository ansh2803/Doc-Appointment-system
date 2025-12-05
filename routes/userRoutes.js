const express = require('express')
const { loginController, registerController, authController, getAllNotificationController, deleteAllNotificationController, getAllDoctorsController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')
//route object
const router = express.Router()
const { applyDoctorController } = require('../controllers/userCtrl')


//route//register//post
router.post('/login', loginController)
//route//register//post
router.post('/register', registerController)

//Auth post
router.post('/getUserData', authMiddleware, authController)

//Apply Doctor || POST
router.post('/apply-doctor',authMiddleware, applyDoctorController)

//Notification Doctor || POST
router.post('/get-all-notification',authMiddleware, getAllNotificationController)

//Notification Doctor || POST
router.post('/delete-all-notification',authMiddleware, deleteAllNotificationController)
//GET ALL DOCTOR
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)
module.exports = router


