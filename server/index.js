const { graphqlHTTP } = require("express-graphql");
const express = require('express');
const cors = require("cors");

const queries = require("./queries/queries");
const schema = require("./schema/schema");
const port = 8000;

queries.connectToDb();
queries.useGameDatabase();

const app = express();
app.use(cors())
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
})); 


app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});