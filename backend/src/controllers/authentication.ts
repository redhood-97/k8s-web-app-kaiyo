import express from "express";
import { User, createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res.sendStatus(400);
        }

        // verify the password now
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        // update the user session
        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        res.cookie(
            process.env.COOKIE_KEY_NAME,
            user.authentication.sessionToken,
            {
                domain: process.env.DOMAIN_FOR_COOKIE,
                path: "/",
            }
        );
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
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const newUser: User = {
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        };

        const user = await createUser(newUser);

        return res.status(200).json(user).end();
    } catch (error) {
        return res.sendStatus(400);
    }
};
