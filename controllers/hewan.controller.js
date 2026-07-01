import { prisma } from '../lib/prisma.js'

export const createHewan = async (req, res) => {
    try {
        const body = req.body;
        const userCookie = req.cookies.user;
        if (!userCookie) {
            return res.status(401).json({ message: "Sesi login tidak ditemukan" });
        }
        
        const user = JSON.parse(userCookie);

        await prisma.hewan.create({
            data: {
                nama: body.nama,
                spesies: body.spesies,
                umur: Number(body.umur),
                pemilik_id: Number(user.id) 
            }
        });

        res.json({ message: 'Hewan created successfully' });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat data hewan" });
    }
}

export const createHewanAdmin = async (req, res) => {
    try {
        const { nama, spesies, umur, pemilik_id } = req.body;

        await prisma.hewan.create({
            data: {
                nama,
                spesies,
                umur: Number(umur),
                pemilik_id: Number(pemilik_id) 
            }
        });

        res.json({ message: 'Hewan berhasil ditambahkan oleh Admin' });
    } catch (error) {
        res.status(500).json({ message: "Gagal membuat data hewan oleh Admin" });
    }
}

export const getAllHewan = async (req, res) => {
    const data = await prisma.hewan.findMany({
        include: { pemilik: true }
    })
    res.json(data)
}

export const getHewanByAuth = async (req, res) => {
    try {
        const userCookie = req.cookies.user;
        if (!userCookie) return res.status(401).json({ message: "Tidak ada akses" });
        
        const user = JSON.parse(userCookie);

        const data = await prisma.hewan.findMany({
            where: { pemilik_id: Number(user.id) },
            include: { pemilik: true }
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data" });
    }
}

export const getHewanById = async (req, res) => {
    const { id } = req.params; 

    if (!id) return res.status(400).json({ message: "ID parameter is missing" });

    try {
        const data = await prisma.hewan.findUnique({
            where: { id: Number(id) }
        });
        
        if (!data) return res.status(404).json({ message: "Data not found" });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateHewan = async (req, res) => {
    const idHewan = Number(req.params.id)
    await prisma.hewan.update({
        where: { id: idHewan },
        data: req.body 
    })
    res.json({ message: 'Data was updated successfully' })
}

export const deleteHewan = async (req, res) => {
    const idHewan = Number(req.params.id)
    await prisma.hewan.delete({
        where: { id: idHewan }
    })
    res.json({ message: 'data was deleted' })
}