import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        curp: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            required: true
        }
    }
)

export const UserModel = model("users", UserSchema)