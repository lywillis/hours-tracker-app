import express from 'express';

import * as timelogController from '../controllers/timelog.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
    .get(timelogController.getTimeLogs);

export default router; 