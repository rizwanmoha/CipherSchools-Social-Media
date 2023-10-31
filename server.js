const express =  require('express');
const dotenv = require('dotenv');


const connectDB = require("./connection/db.js");
dotenv.config();

const userRoutes = require('./routes/userRoute.js');

const postRoutes = require('./routes/postRoute.js');

const commentRoutes = require('./routes/commentRoute.js');

const app = express();


// first establish the connection in database

connectDB()



app.use(express.json());


// All the routes related to user

app.use("/api/v1/user", userRoutes);

// All the routes related to post

app.use("/api/v1/post" , postRoutes);


// All the routes related to comment 

app.use("/api/v1/comment" , commentRoutes);



const PORT = process.env.PORT || 8080


//  Server is listening on the port 

app.listen(PORT , (req , res) =>{
    console.log(`Server is running on ${process.env.DEV_MODE} port number ${PORT}`);
})







