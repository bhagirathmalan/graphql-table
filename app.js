const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const bodyParser = require('body-parser'); //for body parser
const mongoose = require('mongoose');

const graphQlresolver = require('./graphql/resolver/index');
const graphQlschema = require('./graphql/schema/index')
const isAuth = require('./middleware/is-auth');



const app = express(); //calling express as a function using exporting as a function


app.use(bodyParser.json()); //presize the json body

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'Content -Type,Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();

});
app.use(isAuth);

app.use('/graphql', graphqlHTTP({
        schema:graphQlschema,
        rootValue :graphQlresolver,
        graphiql:true
})


);


//mongo connection
mongoose.connect(`mongodb+srv://student-1:${process.env.MONGO_PASSWORD}@marksheet.xte8g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000, () => console.log("3000 is Running"));

}

).catch(err => {
    console.log(err);
});


//call the listen method here there portnumber is 3000 we can user what we have to use





