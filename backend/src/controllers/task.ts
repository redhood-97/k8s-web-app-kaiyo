import { Task, getTasks, createTask, updateTask, deleteTask, updateStatus } from "db/tasks";
import { Request, Response } from "express";

export const retrieve = async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.sendStatus(400);
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

        const createdTask = await createTask(task);
        return res.status(201).json(createdTask);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { name, isCompelted = false } = req.body;
        const identifier = req.params.id;

        if (!identifier || !name) {
            return res.sendStatus(400);
        }
        const task: Task = {
            name, completed: isCompelted
        };

        const updatedTask = await updateTask(identifier, task);
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const identifier = req.params.id;
        const deletedTask = await deleteTask(identifier);
        return res.status(204).json(deletedTask);

    } catch (error) {
        return res.sendStatus(400);
    }
};

export const modifyStatus = async (req: Request, res: Response) => {
    try {
        const identifier = req.params.id;

        const isCompelted = req.body.isCompelted === true ? true : false;

        const deletedTask = await updateStatus(identifier, isCompelted);
        return res.status(200).json(deletedTask);
    } catch (error) {
        return res.sendStatus(400);
    }
};