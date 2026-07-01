import express from 'express'
import { createRekamMedis, deleteRekamMedis, getAllRekamMedis, getRekamMedisByAuth, getRekamMedisById, updateRekamMedis } from '../controllers/rekammedis.controller.js';

const router = express.Router();

router.post('/', createRekamMedis);
router.get('/', getAllRekamMedis);
router.put('/:id', updateRekamMedis);
router.delete('/:id', deleteRekamMedis);
router.get('/my-rekammedis', getRekamMedisByAuth);
router.get('/:id', getRekamMedisById);

export default router;