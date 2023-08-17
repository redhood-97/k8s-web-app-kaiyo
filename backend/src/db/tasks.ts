import mongoose, { Document, Model } from "mongoose";

export interface Task {
    name: string;
    completed?: boolean;
}

const taskSchema = new mongoose.Schema<Task & Document>({
    name: { type: String, required: true },
    completed: { type: Boolean, required: false, default: false }
});

export const taskModel: Model<Task & Document> = mongoose.model(
    "Task",
    taskSchema
);

export const getTasks = () => taskModel.find();

export const getTaskById = (id: string) => taskModel.findById(id);

export const createTask = (values: Task): Promise<Task & Document> =>
    new taskModel(values).save().then((task) => task.toObject());

export const deleteTask = (id: string) => taskModel.findByIdAndDelete(id);

export const updateTask = (
    id: string,
    values: Task
): Promise<Task & Document> => taskModel.findByIdAndUpdate(id, values);

export const updateStatus = (
    id: string,
    status: boolean
): Promise<Task & Document> => taskModel.findByIdAndUpdate(id, { completed: status });
