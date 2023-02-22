import mongoose from "mongoose";
import { userData } from "../interfaces/allInterface";


interface mainData extends userData, mongoose.Document {}


const userSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
    },
    verified: {
        type: Boolean,
    },
    wallet: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "wallets",
        },
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "histories",
        }
    ],

},
    {timestamps: true}
)

const userModel = mongoose.model<mainData>("users", userSchema)

export default userModel