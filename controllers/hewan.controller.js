import { prisma } from '../lib/prisma.js'

export const createHewan = async (req, res) => {
    const body = req.body

    await prisma.hewan.create({
        data: {
            nama: body.nama,
            spesies: body.spesies,
            umur: parseInt(body.umur),
            pemilik_id: parseInt(body.pemilik_id)
        }
    })

    res.json({
        message: 'Hewan created successfully'
    })
}

export const getAllHewan = async (req, res) => {
    const hewan = await prisma.hewan.findMany()
    
    res.json({
        data: hewan
    })
}