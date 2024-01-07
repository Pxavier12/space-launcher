import express from "express";

import { multerMiddleware } from "../../../middlewares/multer";

import {
  getRovers,
  getRoverById,
  addRover,
  updateRover,
  deleteRover,
} from "../../controllers/RoverController";

const roverRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Rover:
 *       type: object
 *       required:
 *         - name
 *         - launchDate
 *         - constructionDate
 *         - constructor
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the rover
 *         name:
 *           type: string
 *           description: Rover name
 *         launchDate:
 *           type: date
 *           description: Rover launch date
 *         constructionDate:
 *           type: date
 *           description: Rover construction date
 *         constructor:
 *           type: string
 *           description: Rover's constructor
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

/**
 * @swagger
 * tags:
 *   name: Rover
 *   description: The rovers managing endpoint
 */

/**
 * @swagger
 * /rovers:
 *   get:
 *     summary: Returns the list of all the rovers
 *     tags: [Rover]
 *     responses:
 *       200:
 *         description: The list of the rovers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rover'
 *       404:
 *         description: Rovers list empty
 *       400:
 *         description: Retrieve error
 */
roverRouter.get("/rovers", getRovers);


/**
 * @swagger
 * /rovers:
 *   post:
 *     summary: Add a new rover to the database
 *     tags: [Rover]
 *     responses:
 *       201:
 *         description: Rover added
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rover'
 *       400:
 *         description: Rover not added
 */
roverRouter.post("/rovers",multerMiddleware, addRover);

/**
 * @swagger
 * /rovers/id:
 *   get:
 *     summary: Get a rover details with his id
 *     tags: [Rover]
 *     responses:
 *       200:
 *         description: The rover details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rover'
 *       404:
 *         description: Rover not found
 *       400:
 *         description: Retrieve error
 */
roverRouter.get("/rovers/:id", getRoverById);

/**
 * @swagger
 * /rovers/id:
 *   put:
 *     summary: Update a rover details by his id
 *     tags: [Rover]
 *     responses:
 *       200:
 *         description: Rover updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rover'
 *       404:
 *         description: Rover not found
 *       400:
 *         description: Update error
 */
roverRouter.put("/rovers/:id", updateRover);


/**
 * @swagger
 * /rovers/id:
 *   delete:
 *     summary: Delete a rover details by his id
 *     tags: [Rover]
 *     responses:
 *       200:
 *         description: Rover deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rover'
 *       404:
 *         description: Rover not found
 *       400:
 *         description: Delete error
 */
roverRouter.delete("/rovers/:id", deleteRover);

export default roverRouter;
