const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/graphQLSchema');
const mongoose = require('mongoose');

//CONSTANTS
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@crudmongodb-t7ak7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

//EXPRESS INSTANCE
const app = express();

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


//GRAPHQL ENDPOINT
app.use('/graphql', graphqlHTTP({

    schema,
    graphiql:true

}));

 
//EXPRESS APP CONNECTED
app.listen(3000, () => {

    console.log('Listening on port 3000');

});