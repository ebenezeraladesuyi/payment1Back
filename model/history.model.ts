import mongoose from "mongoose";
import { historyData } from "../interfaces/allInterface";


interface HistoryData extends historyData, mongoose.Document {}


const historySchema = new  mongoose.Schema({
    message: {
        type: String,
    },
    transactionRef: {
        type: Number,
    },
   TransactionType: {
        type: String,
    },
},
    {timestamps: true}
)

const historyModel = mongoose.model<HistoryData>("histories", historySchema)

export default historyModel;