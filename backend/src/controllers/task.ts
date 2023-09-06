import { Task } from "../db/tasks";
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const retrieve = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany()
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(400).json({error: error, messsage: error.message});
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }

        const task: Task = {
            name
        };

        const createdTask = await prisma.task.create({
            data: task
        });

        return res.status(201).json(createdTask);
    } catch (error) {
        return res.status(400).json({error: error, messsage: error.message});
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { name, isCompelted = false } = req.body;
        const identifier = +req.params.id;

        if (!identifier || !name) {
            return res.sendStatus(400);
        }
        const task: Task = {
            name, 
            completed: isCompelted
        };

        const updatedTask = await prisma.task.update({
            where: {
                id: identifier
            },
            data: task
        })
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const identifier = +req.params.id;
        const deletedTask = await prisma.task.delete({
            where: {
                id: identifier
            }
        });
        return res.status(204).json(deletedTask);

    } catch (error) {
        return res.sendStatus(400);
    }
};

export const modifyStatus = async (req: Request, res: Response) => {
    try {
        const identifier = +req.params.id;

        const isCompelted = req.body.isCompelted === true ? true : false;
        
        const deletedTask = await prisma.task.update({
            where: {
                id: identifier
            },
            data: {
                completed: isCompelted
            }
        })
        return res.status(200).json(deletedTask);
    } catch (error) {
        return res.sendStatus(400);
    }
};