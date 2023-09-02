const express = require('express')
const router = express.Router()

const Location = require('../controllers/locations')


/**
 * @swagger
 * tags:
 *   name: Location Api
 *   description: Location API  - get logations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - postId
 *         - locationName
 *         - longitude
 *         - latitude
 *       properties:
 *         postId:
 *           type: string
 *           description: Post ID
 *         locationName:
 *           type: string
 *           description: Location name
 *         longitude:
 *           type: string
 *           description: The longitude of this Location
 *         latitude:
 *           type: string
 *           description: The latitude of this Location
 *         isDeleted:
 *           type: Boolean
 *           description: default is "false". when the post delete it change to "true".
 *       example:
 *           postId: '32746903459021'
 *           locationName: 'Ein Bokek'
 *           longitude: -121.814095
 *           latitude: 39.69377
 *           isDeleted: false
 */


/**
 * @swagger
 * /location/getAllLocations:
 *   get:
 *     summary: Get all locations
 *     tags: [Location Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Get all locations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.get('/getAllLocations', Location.getAllLocations);

/**
 * @swagger
 * /location/getLikedLocations:
 *   get:
 *     summary: Get liked locations
 *     tags: [Location Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Get liked locations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.post('/getLikedLocations', Location.getLikedLocations);

/**
 * @swagger
 * /location/locationSearch:
 *   get:
 *     summary: Get location search results
 *     tags: [Location Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Get location search results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.post('/locationSearch', Location.locationSearch)


/**
 * @swagger
 * /location/getMyPostsLocations:
 *   get:
 *     summary: Get my post location.
 *     tags: [Location Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Get my post location
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
router.post('/getMyPostsLocations', Location.getMyPostsLocations);

module.exports = router