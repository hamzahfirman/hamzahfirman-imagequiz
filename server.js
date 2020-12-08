//Author: Hamzah M. Firman
//Class : ISTA 330 - Advanced Web Design
//Assignment: Practicum 7
//Date  : 12/08/20

const express = require('express');
var cors = require('cors'); // This gives access to public (whoever wants to use this API)
let data = require('./data');
const app = express();
const port = process.env.PORT || 3002; //'process.env.PORT' - Needed for production where a host can choose 
                                       // its own preference PORT for this API (Detail: Reads 'env' file and 
                                       // looks for 'PORT' key to get the port number)

// Middlewares
app.use(cors()); 
app.use(express.json()); // Converts into JSON 
app.use(express.urlencoded({extended: true}));


// METHOD: GET
app.get('/' , (request, response) => {
    response.json("Welcome to Image Quiz API!");
})
// METHOD: GET
app.get('/quizzes' , (request, response) => {
    //Only sending the metadata 'name', 'id', and 'image'
    // '.map()' higher order function can simply help to 
    // only capture the wanted data
    let metadata = data.quizzes.map(x => {
        return {
            name: x.name,
            id: x.id,
            image:x.image
            }
    })
    response.json(metadata);
})
// METHOD: GET
app.get('/quiz/:id' , (request, response) => {
let searchFor = request.params.id;
let found = data.quizzes.find(x => x.id === searchFor);
if(found) {
    response.json(found);
}
else{
    response.status(404).json({error: `The type ${searchFor} could not be found.`})
}

})
// METHOD: POST
app.post('/score', (request, response) =>{
    let score = request.body;
    data.scores.push(score);
    response.json({message:'The score saved successfully.'})
});

app.listen(port, () => {
    console.log(`Imagequiz API listening on port ${port}!`)
});
