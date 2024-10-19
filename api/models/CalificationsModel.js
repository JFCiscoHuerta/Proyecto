import { Schema, model } from "mongoose";

const CalificationSchema = new Schema(
    {
        round: {
            type: String,
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'events'
        },
        califications: [
            {
                metric: {
                    type: Schema.Types.ObjectId,
                    ref: 'events'
                },
                calification: {
                    type: Number,
                    required: true
                }                
            }
        ]

    }
)

export const CalificationModel = model("califications", CalificationSchema)