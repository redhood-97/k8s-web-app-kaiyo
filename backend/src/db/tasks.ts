import prisma from '@src/utils/libs/prisma';

export interface Task {
    name: string;
    completed?: boolean;
}

export const retrieve = async () => {
    return prisma.task.findMany();
};

export const retrieveById = async (id: number) => {
    return prisma.task.findUnique({
        where: {
            id: id,
        },
    });
};

export const create = async (task: Task) => {
    return prisma.task.create({
        data: task,
    });
};

export const update = async (id: number, task: Task) => {
    return prisma.task.update({
        where: {
            id: id,
        },
        data: task,
    });
};

export const updateStatus = async (id: number, completed: boolean) => {
    return prisma.task.update({
        where: {
            id: id,
        },
        data: {
            completed: completed,
        },
    });
};

export const remove = async (id: number) => {
    return prisma.task.delete({
        where: {
            id: id,
        },
    });
};
