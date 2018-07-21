import express from 'express';

import * as projectController from '../controllers/project.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/project/add')
    .post(projectController.addProject);

router.route('/project/find')
    .post(projectController.getProjects);

export default router; 