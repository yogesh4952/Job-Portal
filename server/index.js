// server.js or index.js (ES Module version)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './DB/index.js';
import router from './Routes/authRouter.js';

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
));
app.use(express.json());

app.use('/auth', router);
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 5001;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
