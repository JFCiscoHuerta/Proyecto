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
                required: true
            }
        ],
    },
    {
        leader: {
            type: Schema.Types.ObjectId,
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
                required: true
            }
        ]
    }
    
])

export const TeamModel = model("teams", TeamSchema)