const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const 

//CONSTANTS

const connection_url = "mongodb+srv://harsh07bharvada:gelato@07@crudmongodb-t7ak7.mongodb.net/test?retryWrites=true&w=majority";
const dbname = "horrorscope";

const app = express();

app.listen(3000,()=>{
    console.log("Connected to the server!");

    mongoose.connect(connection_url,{ useNewUrlParser: true,useUnifiedTopology: true },(err,client)=>{
        
        if(err)
        {
            throw err;
        }
        console.log("Connected to DB");
    })

})