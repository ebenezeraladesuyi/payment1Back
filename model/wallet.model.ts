import mongoose from "mongoose";
import { walletData } from "../interfaces/allInterface";


interface WalletData extends walletData, mongoose.Document {}


const walletSchema = new  mongoose.Schema({
    balance: {
        type: Number,
    },
    credit: {
        type: Number,
    },
    debit: {
        type: Number,
    },
},
    {timestamps: true}
)

const walletModel = mongoose.model<WalletData>("wallets", walletSchema)

export default walletModel;