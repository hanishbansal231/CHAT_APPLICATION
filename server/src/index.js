import app from "./app.js";
import { config } from 'dotenv';
import { connectDB } from "./config/dbConnection.js";
config({
    path: './.env'
});

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log('MONGODB CONNECTION FAILED !!!', error);
    })
