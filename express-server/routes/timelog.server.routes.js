import express from 'express';

import * as timeLogController from '../controllers/timelog.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
    .get(timeLogController.getTimeLogs)
    .post(timeLogController.addTimeLog);
router.route('/:id')
    .delete(timeLogController.deleteTimeLog);

export default router; 