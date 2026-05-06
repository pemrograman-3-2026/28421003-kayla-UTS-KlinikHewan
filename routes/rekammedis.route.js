import express from 'express'
import { createRekamMedis, getAllRekamMedis } from '../controllers/rekammedis.controller.js';

const router = express.Router();

router.post('/', createRekamMedis);
router.get('/', getAllRekamMedis);

export default router;