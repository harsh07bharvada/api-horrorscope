const express = require('express');

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/graphQLSchema');
const mongoose = require('mongoose');

const url = "mongodb+srv://harsh07bharvada:gelato%4007@crudmongodb-t7ak7.mongodb.net/test?retryWrites=true&w=majority";
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

const app = express();

app.use('/graphql', graphqlHTTP({

    schema,
    graphiql:true

}));

 

app.listen(3000, () => {

    console.log('Listening on port 3000');

});