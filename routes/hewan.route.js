import express from 'express'
import { createHewan, getAllHewan } from '../controllers/hewan.controller.js';

const router = express.Router();

router.post('/', createHewan);
router.get('/', getAllHewan);

export default router;