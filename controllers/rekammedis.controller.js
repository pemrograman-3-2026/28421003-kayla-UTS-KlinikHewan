import { prisma } from '../lib/prisma.js'

export const createRekamMedis = async (req, res) => {
    const body = req.body

    await prisma.rekamMedis.create({
        data: {
            hewan_id: Number(body.hewan_id),
            keluhan: body.keluhan,
            diagnosis: body.diagnosis,
            resep_obat: body.resep_obat
        }
    })

    res.json({
        message: 'Rekam Medis was created'
    })
}

export const updateRekamMedis = async (req, res) => {
    const body = req.body

    let data = {
        hewan_id: Number(body.hewan_id),
        keluhan: body.keluhan,
        diagnosis: body.diagnosis,
        resep_obat: body.resep_obat
    }

    await prisma.rekamMedis.update({
        where: {
            id: Number(req.params.id)
        },
        data
    })

    res.json({
        message: 'Rekam Medis was updated'
    })
}

export const getAllRekamMedis = async (req, res) => {
    const data = await prisma.rekamMedis.findMany({
        include: {
            hewan: true
        }
    })

    res.json(data)
}