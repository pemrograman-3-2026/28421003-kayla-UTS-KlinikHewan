import express from 'express'
import { createRekamMedis, getAllRekamMedis, updateRekamMedis } from '../controllers/rekammedis.controller.js';

const router = express.Router();

router.post('/', createRekamMedis);
router.get('/', getAllRekamMedis);
router.put('/:id', updateRekamMedis);

export default router;