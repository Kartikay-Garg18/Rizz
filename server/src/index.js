import app from './app.js'
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {server} from './utils/socket.js'

dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});