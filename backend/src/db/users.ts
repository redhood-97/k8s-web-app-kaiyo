import mongoose, { Document, Model } from "mongoose";

export interface User {
    username: string;
    email: string;
    authentication: {
        password: string;
        salt: string;
        sessionToken?: string;
    };
}

const userSchema = new mongoose.Schema<User & Document>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const userModel: Model<User & Document> = mongoose.model(
    "User",
    userSchema
);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
    userModel.findOne({
        "authentication.sessionToken": sessionToken,
    });
export const getUserById = (id: string) => userModel.findById(id);

export const createUser = (values: User): Promise<User & Document> =>
    new userModel(values).save().then((user) => user.toObject());

export const deleteUser = (id: string) => userModel.findByIdAndDelete(id);

export const updateUser = (
    id: string,
    values: User
): Promise<User & Document> => userModel.findByIdAndUpdate(id, values);
