import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface User {
    username: string;
    email: string;
    password: string;
    salt: string;
    sesstionToken?: string;
}

export const getUserBySessionToken = (sessionToken: string) => {
    try {
        return prisma.user.findFirst({
            where: {
                sessionToken: sessionToken,
            },
        });
    } catch (error) {
        return null;
    }
};

export const findAll = () => {
    return prisma.user.findMany();
};

export const create = (user: User) => {
    return prisma.user.create({
        data: user,
    });
};

export const update = (id: number, user: User) => {
    return prisma.user.update({
        where: {
            id: id,
        },
        data: user,
    });
};

export const remove = (id: number) => {
    return prisma.user.delete({
        where: {
            id: id,
        },
    });
};

export const findByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

export const updateSessionToken = (id: number, sessionToken: string) => {
    return prisma.user.update({
        where: {
            id: id,
        },
        data: {
            sessionToken: sessionToken,
        },
    });
};
