import { NextFunction, Request, Response } from 'express';
import {
    User,
    findAll,
    remove as Remove,
    update as Update,
} from '../db/users';
import { random, authentication } from '../helpers';

export const retrieveUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAll();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const deletedUser = await Remove(+id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};
