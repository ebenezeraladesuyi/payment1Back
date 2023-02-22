import mongoose from "mongoose";

const DB = "mongodb://localhost/shopping";

const dbConnect = async () => {
    try {
        const connecting = await mongoose.connect(DB);
        console.log(`database don connect to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect