import express from 'express';
import cors from 'cors'
import { connection } from './Utiles/db.js';
import { userRoutes } from './Routes/userRoutes.js';
import { createTables } from './Models/createTable.js';



const app = express ();

app.use(cors())
app.use(express.json())
app.use('/api/v1',userRoutes)

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("Connected to the database successfully");
        createTables()
    }
});

app.listen(3001,()=>console.log('server running on port 3001'))
