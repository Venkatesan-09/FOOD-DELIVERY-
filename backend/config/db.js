import mongoose from "mongoose";
import dns from "node:dns";

try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
    console.log("Custom DNS set failed:", e.message);
}

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("MongoDB Primary connection error:", error.message);
        try {
            const fallbackUri = process.env.MONGODB_URI_FALLBACK || "mongodb://127.0.0.1:27017/food-del";
            await mongoose.connect(fallbackUri, { serverSelectionTimeoutMS: 5000 });
            console.log("Connected to fallback local DB successfully");
        } catch (err) {
            console.error("Fallback DB connection error:", err.message);
        }
    }
}

