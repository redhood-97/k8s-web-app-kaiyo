import express from 'express';

import { User, findByEmail, updateSessionToken, create } from '../db/users';
import { random, authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await findByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        // verify the password now
        const expectedHash = authentication(user.salt, password);

        if (user.password !== expectedHash) {
            return res.sendStatus(403);
        }

        // update the user session
        const salt = random();
        user.sessionToken = authentication(salt, user.id.toString());

        await updateSessionToken(user.id, user.sessionToken);

        const COOKIE_KEY_NAME: string = process.env.COOKIE_KEY_NAME || 'astuto-app';

        res.cookie(COOKIE_KEY_NAME, user.sessionToken, {
            domain: process.env.DOMAIN_FOR_COOKIE,
            path: '/',
        });
        return res.status(200).json(user).end();
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        // check email exists
        const existingUser = await findByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const newUser: User = {
            username,
            email,
            salt,
            password: authentication(salt, password),
        };

        const user = await create(newUser);

        return res.status(200).json(user).end();
    } catch (error) {
        return res.sendStatus(400);
    }
};
