import { Schema, model } from "mongoose";

const TeamSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        round: {
            type: Number,
            required: true
        },
        calification: {
            type: Schema.Types.ObjectId,
            ref: 'califications'
        }
    }
)

export const TeamModel = model("teams", TeamSchema)