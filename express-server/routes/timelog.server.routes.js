import express from 'express';

import * as timeLogController from '../controllers/timelog.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/log/add')
    .post(timeLogController.addTimeLog);

router.route('/log/find')
    .post(timeLogController.getTimeLogs);

router.route('/log/:id')
    .get(timeLogController.getTimeLog)
    .delete(timeLogController.deleteTimeLog);

export default router; 