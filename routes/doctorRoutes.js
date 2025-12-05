const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');                                    
const { getDoctorInfoConroller, updateProfileController } = require('../controllers/doctorCtrl');
const router = express.Router();
//POST SINGLE DOCTOR INFO
router.post('/getDoctorInfo', authMiddleware,getDoctorInfoConroller)
//POST UPDATE PROFILE   
router.post('/updateProfile', authMiddleware, updateProfileController)
module.exports = router;
