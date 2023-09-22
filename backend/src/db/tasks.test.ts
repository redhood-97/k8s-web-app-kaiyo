//test/sample.test.ts
import { expect, test, vi } from 'vitest'
import { create } from './tasks';
import prisma from '../utils/libs/__mocks__/prisma';

vi.mock('@src/utils/libs/prisma');

test('create task should return the generated task', async () => {
  const newTask = { name: 'user@prisma.io' };
  prisma.task.create.mockResolvedValue({ ...newTask, id: 1, completed: null });

  const task = await create(newTask)
  expect(task).toStrictEqual({ ...newTask, id: 1, completed: null })
});