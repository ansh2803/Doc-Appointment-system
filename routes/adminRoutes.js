const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl')
const { changeAccountStatusController } = require('../controllers/adminCtrl')
const router = express.Router()
//GET METHO TO GET ALL USERS
router.get('/get-all-users', authMiddleware, getAllUsersController)
//GET METHO TO GET ALL DOCTORS
router.get('/get-all-doctors', authMiddleware, getAllDoctorsController)
//POST METHOD TO CHANGE ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
module.exports = router