import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    const body = req.body
    const password = body.password
    
    const hashPassword = bcrypt.hashSync(password, 12)

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    if (isUsernameExist) {
        return res.status(400).json({
            message: 'Username already exist'
        })
    }

    await prisma.user.create({
        data:{
            username: body.username,
            password: hashPassword,
            no_telp: body.no_telp,
            role: body.role
        }
    })

    return res.json({
        message: 'Register Successfully'
    })
}

export const login = async (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!isUsernameExist) {
        return res.status(404).json({
            message: 'Username not found'
        })
    }

    const hashPassword = isUsernameExist.password

    if (!bcrypt.compareSync(password, hashPassword)) {
        return res.status(401).json({
            message: 'Incorrect Password'
        })
    }

    const dataSession = JSON.stringify({
        id: isUsernameExist.id,
        username,
        no_telp: isUsernameExist.no_telp,
        role: isUsernameExist.role
    })

    res.cookie('user', dataSession, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return res.json({
        message: 'Login Successfully',
        data: {
            username: isUsernameExist.username,
            role: isUsernameExist.role,
            no_telp: isUsernameExist.no_telp
        }
    })
}

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany()
    
    res.json(users) 
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({ message: "User berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus user" });
    }
}