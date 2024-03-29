const express = require('express')
const router = express.Router()

const Auth = require('../controllers/auth')

router.post('/login', Auth.login)
router.post('/register', Auth.register)
router.post('/logout', Auth.logout)
router.post('/refreshToken', Auth.refreshToken)
router.post('/loginApps', Auth.loginApps)


module.exports = router