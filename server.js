const express = require('express');   // use as framework for server creation. It is middleware
const bcrypt = require('bcrypt-nodejs'); // yse to generate SHA keys
const cors = require('cors'); // It allows cross origin resource sharing
const knex = require('knex'); // use to connect to postgres database
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
       connectionString: process.env.DATABASE_URL,
       ssl: true,
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.json("successfully started");
})

// We cane see that the req contains the function in some different. here we use the method of function calling another function. 
// So open all the .js file and see the function first works with db,bcrypt or db variable and this generated output that is taken by another function using req and res as variable.
app.post('/signin', signin.handleSignin(db,bcrypt))

app.post('/register',register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImagePost(db))

// This created this endpoint, so that the api call is made from backend as if it is made from frontend the api key is visisble to everyone
app.post('/imageurl',image.handleApiCall())


app.listen(process.env.PORT || 3001, ()=> {
    console.log(`Application is running on port  ${process.env.PORT}`);
})

/*
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = status of new user
 /profile/:userID --> GET req which will give user
 /image ---> PUT

*/