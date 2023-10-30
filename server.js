const express =  require('express');
const dotenv = require('dotenv');


const connectDB = require("./connection/db.js");
dotenv.config();

const userRoutes = require('./routes/userRoute.js');

const postRoutes = require('./routes/postRoute.js');

const app = express();

connectDB()



app.use(express.json());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/post" , postRoutes);



const PORT = process.env.PORT || 8080

app.listen(PORT , (req , res) =>{
    console.log(`Server is running on ${process.env.DEV_MODE} port number ${PORT}`);
})




