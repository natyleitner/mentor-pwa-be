const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongo = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const { buildSchema } = require("graphql"); // import the function to build our schema
const Mentor = require("./models/mentor");

const url = "mongodb://127.0.0.1:27017/mentor-pwa";

app.use(bodyParser.json()); // use body-parser middleware to parse incoming json

// app.use(
//   "/graphiql",
//   graphqlHTTP({ schema: require("./schema.js"), graphiql: true })
// );

// app.listen(8080, () => {
//   console.log("Server running successfully...");
// });

app.use(
  "/graphql",
  graphqlHTTP({
    // set up our graphql endpoint with the express-graphql middleware
    // build a graphql schema
    schema: buildSchema(`
    type Mentor {
        _id: ID!
        name: String!
        title: String!
        description: String!
        keywords: [String]!
        email: String!
        profileImage: String
    }

    input MentorAttributes {
        name: String!
        title: String!
        description: String!
        keywords: [String]!
        email: String!
        profileImage: String
    }


    type mentorQuery {
        allMentors: [Mentor!]!
    }

    type mentorMutation {
        createMentor(attributes: MentorAttributes): Mentor
    }

    schema {
        query: mentorQuery
        mutation: mentorMutation
    }
    `),
    rootValue: {
      allMentors: () => {
        // return all the blogs unfiltered using Model
        return Mentor.find()
          .then((mentors) => {
            return mentors;
          })
          .catch((err) => {
            throw err;
          });
      },
      createMentor: (args) => {
        const mentor = new Mentor({
          name: args.attributes.name,
          title: args.attributes.title,
          email: args.attributes.email,
          description: args.attributes.description,
          keywords: args.attributes.keywords,
        });

        return mentor
          .save()
          .then((result) => {
            console.log(result);
            return result;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
    }, // an object with resolver functions
    graphiql: true, // enable the graphiql interface to test our queries
  })
);

// app.get("/", (request, response, next) => {
//   response.send("Our app is alive!");
// });

mongo
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
