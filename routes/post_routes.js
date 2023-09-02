const express = require("express");
const router = express.Router();

const Post = require("../controllers/posts");
const authenticate = require("../common/auth_middleware");

/**
 * @swagger
 * tags:
 *   name: Post Api
 *   description: Post API  - CRUD operations
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - postTitle
 *         - postDescription
 *         - likes
 *         - userName
 *         - categoriesList
 *         - videoUrl
 *         - isDeleted
 *         - longitude
 *         - latitude
 *         - updateDate
 *       properties:
 *         postTitle:
 *           type: string
 *           description: Post title
 *         postDescription:
 *           type: string
 *           description: Post description
 *         likes:
 *           type: number
 *           description: Nuber of likes in this post
 *         userName:
 *           type: string
 *           description: The user name who upload this post
 *         categoriesList:
 *           type: [String]
 *           description: The Tags of this post
 *         videoUrl:
 *           type: string
 *           description: The path to the video of the post
 *         isDeleted:
 *           type: boolean
 *           description: default is "false". when the post delete it change to "true".
 *         longitude:
 *           type: float
 *           description: The longitude of the location in this post
 *         latitude:
 *           type: float
 *           description: The latitude of the location in this post
 *         updateDate:
 *           type: Date
 *           description: The date that the post created
 *         postID:
 *           type: string
 *           description: post ID created when user create a post
 *       example:
 *           postTitle: 'Ein Bokek'
 *           postDescription: 'Located near the Dead Sea, there is a hiking trail with water and you can have a picnic there'
 *           likes: 34
 *           userName: 'jenny'
 *           categoriesList: [water, picnic]
 *           videoUrl: 'http://193.106.55.132:3000/videos/c854f81d-79d8-472f-bc44-b9b1018e3a9e.mp4'
 *           isDeleted: false
 *           longitude: -121.814095
 *           latitude: 39.69377
 *           updateDate: 23/05/2022
 */


/**
 * @swagger
 * /post/addNewPost:
 *   post:
 *     summary: Add a new post
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The new post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/addNewPost",authenticate, Post.addNewPost);

/**
 * @swagger
 * /post/getPosts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Get all posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/getAllPosts", Post.getPosts);


/**
 * @swagger
 * /post/partialPostSearch:
 *   get:
 *     summary: Get search results for posts
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Get search results for posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/partialPostSearch', Post.partialPostSearch)


/**
 * @swagger
 * /post/getPostsbyUsername:
 *   get:
 *     summary: Get post by Username
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Get post by Username
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/getPostsbyUsername", Post.getPostsbyUsername);

/**
 * @swagger
 * /post/getPostById:
 *   get:
 *     summary: Get post by ID
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Get post by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/getPostById", Post.getPostById);

/**
 * @swagger
 * /post/getLikedPostsbyUserName:
 *   get:
 *     summary: Get liked post by UserName
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Get liked post by UserName
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/getLikedPostsbyUserName", Post.getLikedPostsbyUserName);

/**
 * @swagger
 * /post/editPost:
 *   put:
 *     summary: Edit post
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Edit post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/editPost",authenticate, Post.editPost);

/**
 * @swagger
 * /post/deletePost:
 *   delete:
 *     summary: Delete post
 *     tags: [Post Api]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Delete post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post("/deletePost",authenticate, Post.deletePost);

router.post("/getAllPostsBySortAlgorithm", Post.getAllPostsBySortAlgorithm);


module.exports = router;