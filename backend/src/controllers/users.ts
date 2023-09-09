import { Request, Response } from "express";
import {  User, findAll, remove as Remove, update as Update } from "@src/db/users";
import { random, authentication } from "@src/helpers";

export const retrieveUsers = async (req: Request, res: Response) => {
    try {
        const users = await findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await Remove(+id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { email, username, password } = req.body;
        const salt = random();

        const userToUpdate: User = {
            email,
            username,
            salt,
            password: authentication(salt, password),
        };

        const updatedUser = await Update(+id, userToUpdate);

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.sendStatus(400);
    }
};
