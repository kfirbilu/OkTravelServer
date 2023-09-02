const express = require('express')
const router = express.Router()

const User = require('../controllers/users')

/**
 * @swagger
 * tags:
 *   name: User Api
 *   description: User API  - CRUD operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *         - email
 *         - phoneNumber
 *       properties:
 *         userName:
 *           type: string
 *           description: User name
 *         password:
 *           type: string
 *           description: User password
 *         email:
 *           type: number
 *           description: User email
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *         likedList:
 *           type: [String]
 *           description: The post this user liked
 *         imageUrl:
 *           type: string
 *           description: The path to the profile image
 *         tokens:
 *           type: [String]
 *           description: The user get a unique token 
 *       example:
 *           userName: 'Yosi Israeli'
 *           password: 'Aa1234!'
 *           email: 'Yosi@gmail.com'
 *           phoneNumber: '+972538478980'
 *           likedList: [post1, post2]
 *           imageUrl: 'http://193.106.55.132:3000/videos/c854f81d-79d8-472f-bc44-b9b1018e3a9e.mp4'
 *           tokens: 'kjdkfgabu7234bnkjh473j32'
 */

/**
 * @swagger
 * /user/addNewUser:
 *   post:
 *     summary: Add a new user
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Add a new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', User.addNewUser)


/**
 * @swagger
 * /user/addPostIdToLikedList:
 *   post:
 *     summary: Add post ID to like list
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Add post ID to like list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
 router.post('/addPostIdToLikedList', User.addPostIdToLikedList)

 /**
  * @swagger
  * /user/getLikedListByUserName:
  *   get:
  *     summary: Get like list by Username
  *     tags: [User Api]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *           $ref: '#/components/schemas/User'
  *     responses:
  *       200:
  *         description: Get like list by Username
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  */
 router.post('/getLikedListByUserName', User.getLikedListByUserName);





/**
 * @swagger
 * /user/partialUserSearch:
 *   get:
 *     summary: Get search results for useres
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Get search results for useres.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
 router.post('/partialUserSearch', User.partialUserSearch)


/**
 * @swagger
 * /user/getUserbyUsername:
 *   get:
 *     summary: Get user by Username
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Get user by Username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/findByUserName', User.getUserbyUsername);

/**
 * @swagger
 * /user/editUser:
 *   put:
 *     summary: Edit user
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Edit user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/editUser', User.editUser)

/**
 * @swagger
 * /user/deletePost:
 *   delete:
 *     summary: Delete user
 *     tags: [User Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Delete user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/removePostIDFromLikedList', User.removePostIDFromLikedList)

//TODO: Swagger
router.post('/getFollowersByUserName', User.getFollowersByUserName)
router.post('/getFollowingByUserName', User.getFollowingByUserName)


module.exports = router