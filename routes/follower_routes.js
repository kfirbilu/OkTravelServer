const express = require('express')
const router = express.Router()

const Follower = require('../controllers/followers')
const authenticate = require("../common/auth_middleware");

router.post('/follow',authenticate, Follower.follow)
router.post('/checkIfFollow', Follower.checkIfFollow)
router.post('/unfollow',authenticate, Follower.unfollow)

module.exports = router