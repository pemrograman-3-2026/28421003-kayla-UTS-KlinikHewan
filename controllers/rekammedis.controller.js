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
    const idRekamMedis = Number(req.params.id)

    await prisma.rekamMedis.update({
        where: {
            id: idRekamMedis
        },
        data: req.body
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

export const getRekamMedisByAuth = async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        if (!userCookie) return res.status(401).json({ message: "Tidak ada akses" });
        
        const user = JSON.parse(userCookie);

        const data = await prisma.rekamMedis.findMany({
            where: {
                hewan: {
                    pemilik_id: Number(user.id) 
                }
            },
            include: {
                hewan: true
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
}

export const getRekamMedisById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: "ID tidak ditemukan" });
    }

    const data = await prisma.rekamMedis.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!data) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(data);
}

export const deleteRekamMedis = async (req, res) => {
    const idRekamMedis = Number(req.params.id)
    
    await prisma.rekamMedis.delete({
        where: {
            id: idRekamMedis
        }
    })
    
    res.json({
        message: 'data was deleted'
    })
}