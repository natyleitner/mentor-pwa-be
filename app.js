const express = require("express");
const graphqlHTTP = require("express-graphql");

const mongo = require("mongoose");
const app = express();
// mongo.connect('mongodb://***yourusername***:***yourpassword***@ds053317.mlab.com:53317/gql-demo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// mongo.connection.once('open', () => {
//     console.log('connected to database');
// })

// app.use(‘/graphiql’, graphqlHTTP({ schema: require(‘./schema.js’), graphiql: true}));

// app.listen(8080, () => {
//   console.log("Server running succefully...");
// });

app.get("/", (request, response, next) => {
  response.send("Our app is alive!");
});

app.listen(5000);
