import express from 'express'
import { createHewan, getAllHewan, updateHewan } from '../controllers/hewan.controller.js';

const router = express.Router();

router.post('/', createHewan);
router.get('/', getAllHewan);
router.put('/:id', updateHewan);

export default router;