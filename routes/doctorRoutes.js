const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');                                    
const { getDoctorByIdController, updateProfileController, getDoctorInfoConroller, doctorAppointmentController,
    updateStatusController
 } = require('../controllers/doctorCtrl');
const router = express.Router();
//POST SINGLE DOCTOR INFO
router.post('/getDoctorInfo', authMiddleware,getDoctorInfoConroller)
//POST UPDATE PROFILE   
router.post('/updateProfile', authMiddleware, updateProfileController)
//POST GET SINGLE DOC INFO 
router.post('/getDoctorById', authMiddleware, getDoctorByIdController)
//GET Appointments
router.get('/doctor-appointments',authMiddleware,doctorAppointmentController)
//POST UPDATE STATUS
router.post('/update-status',authMiddleware,updateStatusController)
module.exports = router;
