const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/graphQLSchema');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3000;


//CONSTANTS
const url = `mongodb+srv://harsh07bharvada:gelato%4007@crudmongodb-t7ak7.mongodb.net/horrorscope?retryWrites=true&w=majority`;

//EXPRESS INSTANCE
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//MONGOOSE CONNECTION 
mongoose
.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

//GRAPHQL ENDPOINT
app.use('/graphql', graphqlHTTP({

    schema,
    graphiql:true

}));

 
//EXPRESS APP CONNECTED
app.listen(port, () => {

    console.log('Listening on port 3000');

});