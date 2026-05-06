import { prisma } from '../lib/prisma.js'

export const createRekamMedis = async (req, res) => {
    const body = req.body

    await prisma.rekamMedis.create({
        data: {
            hewan_id: parseInt(body.hewan_id),
            keluhan: body.keluhan,
            diagnosis: body.diagnosis,
            resep_obat: body.resep_obat
        }
    })

    res.json({
        message: 'Rekam Medis created successfully'
    })
}

export const getAllRekamMedis = async (req, res) => {
    const rekamMedis = await prisma.rekamMedis.findMany()
    
    res.json({
        data: rekamMedis
    })
}