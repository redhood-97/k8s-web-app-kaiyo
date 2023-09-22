import {
    Task,
    retrieve as Retrieve,
    create as Create,
    update as Update,
    remove as Remove,
    updateStatus as UpdateStatus,
} from '../db/tasks';
import { NextFunction, Request, Response } from 'express';


export const retrieve = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Retrieve();
        return res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }

        const task: Task = {
            name, 
        };

        const createdTask = await Create(task);
        return res.status(201).json(createdTask);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, isCompelted = false } = req.body;
        const identifier = +req.params.id;

        if (!identifier || !name) {
            return res.sendStatus(400);
        }
        const task: Task = {
            name,
            completed: isCompelted,
        };

        const updatedTask = Update(identifier, task);
        return res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = +req.params.id;
        const deletedTask = Remove(identifier);
        return res.status(204).json(deletedTask);
    } catch (error) {
        next(error);
    }
};

export const modifyStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const identifier = +req.params.id;

        const isCompelted = req.body.isCompelted === true ? true : false;

        const deletedTask = await UpdateStatus(identifier, isCompelted);
        return res.status(200).json(deletedTask);
    } catch (error) {
        next(error);
    }
};
