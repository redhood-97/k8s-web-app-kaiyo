import mongoose, { Document, Model } from "mongoose";

export interface Task {
    name: string;
    completed?: boolean;
}