const express = require('express');
const app = express();

// import mongoose
const { mongoose } = require('./db/mongoose');

// body parser middleware
const bodyParser = require('body-parser')

// Load in the mongoose models
const { List, Task } = require('./db/models');

// * Load middleware
app.use(bodyParser.json())

// CORS HEADERS MIDDLEWARE 
// * Different from cors.org website
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});


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
    }).catch((e) => {
        res.send(e)
    })
})

/**
 *  POST /lists
 *  Purpose: Create a list
 */

app.post('/lists', (req, res) => {
    // Create a new list and return the new list document back to the user (wich includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title
    let newList = new List({ title });
    newList.save().then((listDoc) => {
        // the full list document is returned (inc id)
        res.send(listDoc)
    })
})

/**
 *  PATCH /lists/:id
 *  Purpose: Update a specified list
 */

app.patch('/lists/:id', (req, res) => {
    // update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

/**
 *  DELETE /lists/:id
 *  Purpose: Delete a specified list
 */


app.delete('/lists/:id', (req, res) => {
    // Delete the specified list (document with the id in the URL)df
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

/**
 *  GET /lists/:listId/tasks
 *  Purpose: All of the tasks on a specific list
 */

app.get('/lists/:listId/tasks', (req, res) => {
    // Return all tasks that belong to a specific listId
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.status(201).send(tasks)
    })
})

// request a document of one item

app.get('lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

/**
 *  POST /lists/:listId/tasks
 *  Purpose: Create a new task in a specific list
 */

app.post('/lists/:listId/tasks', (req, res) => {
    // We want to create a new task in a list specified listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.status(201).send(newTaskDoc)
    })
})

/**
 *  PATCH /lists/:listId/tasks/:taskId
 *  Purpose: Update an existing task
 * 
 */

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to update  an existing task (specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(201);
    })
})

/**
 *  DELETE /lists/:listId/tasks/:taskId
 *  Purpose: Delete a existing task
 *
 */

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})