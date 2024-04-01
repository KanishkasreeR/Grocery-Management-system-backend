const express = require('express')
const mongoos = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyparser.json())
app.use(cors()) 

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