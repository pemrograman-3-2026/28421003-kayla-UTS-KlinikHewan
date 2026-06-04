import { prisma } from '../lib/prisma.js'

export const createHewan = async (req, res) => {
    const body = req.body

    await prisma.hewan.create({
        data: {
            nama: body.nama,
            spesies: body.spesies,
            umur: Number(body.umur),
            pemilik_id: Number(body.pemilik_id)
        }
    })

    res.json({
        message: 'Hewan was created'
    })
}

export const updateHewan = async (req, res) => {
    const body = req.body

    let data = {
        nama: body.nama,
        spesies: body.spesies,
        umur: Number(body.umur),
        pemilik_id: Number(body.pemilik_id)
    }

    await prisma.hewan.update({
        where: {
            id: Number(req.params.id)
        },
        data
    })

    res.json({
        message: 'Hewan was updated'
    })
}

export const getAllHewan = async (req, res) => {
    const data = await prisma.hewan.findMany({
        include: {
            pemilik: true
        }
    })

    res.json(data)
}