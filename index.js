
require("dotenv").config({path : "./config.env"})

const express = require('express')
const mongoos = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const uploadRouter = require('./upload');
const AdminRouter = require('./Adminauth');
const app = express()
app.use(bodyparser.json())
app.use(cors()) 

app.use('/api', uploadRouter);
app.use('/api', AdminRouter);

async function connectDB(){
try{
        await mongoos.connect('mongodb+srv://kanishka:Aqpfk15rpTGS578W@cluster05.pgwmpx4.mongodb.net/GroceryApplication?retryWrites=true&w=majority&appName=Cluster05')
        const port = process.env.PORT || 8000
        console.log('DB Connection Established :)')
        app.listen(port,function(){
            console.log(`Listening on port ${port}`)
        })
    }
  
catch(error){
   console.log(error)
   console.log("Can't Establish Connection")
}
}
connectDB()