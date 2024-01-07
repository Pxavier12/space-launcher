import express from "express";

import {
  getMissions,
  getMissionById,
  addMission,
  updateMission,
  deleteMission,
} from "../../controllers/MissionController";

const missionRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Mission:
 *       type: object
 *       required:
 *         - name
 *         - launchDate
 *         - country
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the mission
 *         name:
 *           type: string
 *           description: Mission name
 *         country:
 *           type: string
 *           description: Mission's country
 *         launchDate:
 *           type: date
 *           description: Mission's launch date
 *         endDate:
 *           type: date
 *           description: Mission's end date
 *       example:
 *         id: d5fE_asz
 *         name: test
 *         country: france
 *         launchDate: 2020-10-20
 *         endDate: 2020-10-20
 */

/**
 * @swagger
 * tags:
 *   name: Mission
 *   description: The missions managing endpoint
 */

/**
 * @swagger
 * /missions:
 *   get:
 *     summary: Returns the list of all the missions
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description: The list of the missions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *       404:
 *         description: Missions list empty
 *       400:
 *         description: Retrieve error
 */
missionRouter.get("/missions", getMissions);


/**
 * @swagger
 * /missions:
 *   post:
 *     summary: Add a new mission to the database
 *     tags: [Mission]
 *     responses:
 *       201:
 *         description: Mission added
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *       400:
 *         description: Mission not added
 */
missionRouter.post("/missions", addMission);

/**
 * @swagger
 * /missions/id:
 *   get:
 *     summary: Get a mission details with his id
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description: The mission details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *       404:
 *         description: Mission not found
 *       400:
 *         description: Retrieve error
 */
missionRouter.get("/missions/:id", getMissionById);

/**
 * @swagger
 * /missions/id:
 *   put:
 *     summary: Update a mission details by his id
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description: Mission updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *       404:
 *         description: Mission not found
 *       400:
 *         description: Update error
 */
missionRouter.put("/missions/:id", updateMission);


/**
 * @swagger
 * /missions/id:
 *   delete:
 *     summary: Delete a mission details by his id
 *     tags: [Mission]
 *     responses:
 *       200:
 *         description: Mission deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *       404:
 *         description: Mission not found
 *       400:
 *         description: Delete error
 */
missionRouter.delete("/missions/:id", deleteMission);

export default missionRouter;
