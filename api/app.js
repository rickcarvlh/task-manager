const express = require('express');
const app = express();

// body parser middleware
const bodyParser = require('body-parser')

// Load in the mongoose models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json())


/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 *  GET /lists
 *  Purpose: GEt all lists
 */

app.get('/lists', (req, res) => {
    // return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

/**
 *  POST /lists
 *  Purpose: Create a list
 */

app.get('/lists', (req, res) => {
    // Create a new list and return the new list document back to the user (wich includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title
})

/**
 *  PATCH /lists/:id
 *  Purpose: Update a specified list
 */

app.patch('/lists/:id', (req, res) => {
    // update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
})

/**
 *  DELETE /lists/:id
 *  Purpose: Delete a specified list
 */


app.delete('/lists/:id', (req, res) => {
    // Delete the specified list (document with the id in the URL)df
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})