import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

const app = express();

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});