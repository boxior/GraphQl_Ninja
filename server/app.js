const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require(`mongoose`);
const schema = require(`./schema/schema`);
const cors = require("cors");

mongoose.connect(`mongodb://boxior:b13579DB@ds127094.mlab.com:27094/gql-boxior`, {
    useNewUrlParser: true
});
mongoose.connection.once(`open`, () => {
    console.log("connected to database")
});
const app = express();

app.use(cors());

app.use(`/graphql`, graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("now we listen");
});