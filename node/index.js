import express from 'express';
import cors from 'cors'; // Import the CORS package
import db from './db.js';
import todoRouter from './Router/todoRouter.js';

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());


// Use the todoRouter for all routes under /api/todos
app.use('/api', todoRouter);

// Start the server and listen on port 5500
app.listen(5500, () => {
    console.log("Server is running Wild!!");
});

