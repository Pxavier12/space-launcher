import express from 'express'

import { 
    createUser,
    loginUser,
    updateUser,
    updatePassword,
    getUsers
} from '../../controllers/UserController'


const router = express.Router()



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - pseudo
 *         - password
 *         - isAdmin
 *         - isVerified
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         pseudo:
 *           type: string
 *           description: User's pseudo
 *         email:
 *           type: string
 *           description: Users's email
 *         password:
 *           type: date
 *           description: Users's password
 *         isAdmin:
 *           type: boolean
 *           description: User is admin ?
 *         isVerified:
 *           type: boolean
 *           description: User is verified ?
 *       example:
 *         id: d5fE_asz
 *         pseudo: test
 *         email: test@test.fr
 *         password: test123
 *         isAdmin: true
 *         isVerified: true
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The users managing endpoint
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Users list empty
 *       400:
 *         description: Retrieve error
 */
router.get('/users',getUsers)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Add a new user to the database
 *     tags: [User]
 *     responses:
 *       201:
 *         description: User added
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: User not added
 */
router.post('/register',createUser)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     responses:
 *       201:
 *         description: User connected
 *         content:
 *           application/json:
 *             schema:
 *               token : 'tokencontent'
 *       400:
 *         description: User not found ! 
 *       401:
 *         description: User not authorized ! 
 */
router.post('/login',loginUser)

/**
 * @swagger
 * /users/pseudo:
 *   put:
 *     summary: Update a User info by his pseudo
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Update error
 */
router.put('/user/:pseudo',updateUser)

/**
 * @swagger
 * /users/modify/pseudo:
 *   put:
 *     summary: Update a User password by his id
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Password changed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Update error
 */
router.put('/user/modify/:pseudo',updatePassword)


export const usersRouter  = router