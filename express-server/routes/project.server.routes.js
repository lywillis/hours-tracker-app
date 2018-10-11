import express from 'express';

import * as projectController from '../controllers/project.server.controller';
import * as timeLogController from '../controllers/timelog.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/project/add/:name?')
    .post(projectController.addProject)
    .get(projectController.checkIfProjectExists);

router.route('/project/find')
    .post(projectController.getProjects);

router.route('/project/:id')
    .get(projectController.getProject)
    .put(timeLogController.addTimeLog)
    .delete(projectController.deleteProject)

router.route('/project/:id/edit/:log')
    .get(timeLogController.getTimeLog)
    .put(timeLogController.updateTimeLog)
    .delete(timeLogController.deleteTimeLog);


export default router; 