import express from 'express'
import { createHewan, createHewanAdmin, deleteHewan, getAllHewan, getHewanByAuth, getHewanById, updateHewan } from '../controllers/hewan.controller.js';

const router = express.Router();

router.get('/my-hewan', getHewanByAuth);
router.post('/admin', createHewanAdmin); 
router.post('/', createHewan);
router.get('/', getAllHewan);
router.put('/:id', updateHewan);
router.delete('/:id', deleteHewan);
router.get('/:id', getHewanById);

export default router;