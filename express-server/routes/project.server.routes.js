import express from 'express';

import * as projectController from '../controllers/project.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/project/add/:name?')
    .post(projectController.addProject)
    .get(projectController.checkIfProjectExists);

router.route('/project/find')
    .post(projectController.getProjects);

router.route('/project/:id')
    .get(projectController.getProject)
    .put(projectController.addTime)
    .delete(projectController.deleteProject)

router.route('/project/:id/edit/:log')
    .delete(projectController.deleteTimeLog);


export default router; 