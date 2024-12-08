import { Schema, model } from "mongoose";

const TeamSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        },
    },
    {
        id_members: [
            {
                type: Schema.Types.ObjectId,
            }
        ],
    },
    {
        leader: {
            type: String,
            required: true
        },
    }, {
        round: {
            type: Number,
            default: 0
        },
    },
    {
        grades: [
            {
                type: Schema.Types.ObjectId,
            }
        ]
    }
    
])

export const TeamModel = model("teams", TeamSchema)