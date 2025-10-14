const express = require('express')
const { loginController, registerController, authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')
//route object
const router = express.Router()

//route//register//post
router.post('/login', loginController)
//route//register//post
router.post('/register', registerController)

//Auth post
router.post('/getUserData', authMiddleware, authController)
module.exports = router


