const express = require('express');
var cors = require('cors');
let data = require('./entries');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json()); // Converts into JSON 
app.use(express.urlencoded({extended: true}));


app.get('/', (request, response)=> { // Home-page
    response.send('Welcome to Image Quiz API');
})

app.get('/quizzes' , (request, response) => { //All Quizes
    response.json(data.entries);
})

app.get('/quiz/:type' , (request, response) => {
let quizId = request.params.type.toLowerCase();
let found = data.entries.find(x => x.type === quizId);
if(found) {
    response.json(found);
}
else{
    response.status(404).json({error: `The type ${quizId} could not be found.`})
}

})

app.post('/score', (request, response) =>{
    let score = request.body;
    data.scores.push(score);
    response.json({message:'The score saved successfully.'})
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`)
})