import mongoose from "mongoose";
import dns from "node:dns";

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    console.log("Custom DNS set failed:", e.message);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
}
