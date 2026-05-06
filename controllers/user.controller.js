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
            message:'Username already exist'
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

    res.json({
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

    if(!bcrypt.compareSync(password, hashPassword)) {
        return res.status(401).json({
            message: 'Incorrect Password'
        })
    }

    res.json({
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
    
    res.json({
        data: users
    })
}