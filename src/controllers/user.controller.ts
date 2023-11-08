import { Request, Response } from 'express'
import prisma from '../services/prisma'

export const userController = {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json(users)
    },
    async createUser(req: Request, res: Response) {
        const userData = req.body 
        const user = await prisma.user.create({
            data: {
                fname: userData.fname,
                lname: userData.lname,
            },
            include: {
                car: true
            }
        })

        return res.json({ user })
    },
    async findUniqueUser(req: Request, res: Response) {
        const paramId = req.params.id

        const uniqueUser = await prisma.user.findUnique({
            where: {
                id: paramId
            }
        })

        return res.json({ uniqueUser })
    },
    async updateUser(req: Request, res: Response) {
        const paramId = req.params.id
        const newfName = req.body.fname

        const updatedUser = await prisma.user.update({
            data: {
                fname: newfName
            },
            where: {
                id: paramId
            }
        })

        return res.json({ updatedUser })
    },
    async deleteUser(req: Request, res: Response) {
        const paramId = req.params.id

        const deletedUser = await prisma.user.delete({
            where: {
                id: paramId
            }
        })

        return res.json({ deletedUser })
    }
}