const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cluster0.rbrla8m.mongodb.net/',
    {
    dbName: 'intervention',
    user: 'user',
    pass: 'hDiwBGO4VQz7WQO9'
    })
.then(() => {
    console.log('Connected to database');
    console.log('Database Name: ', mongoose.connection.db.databaseName);
    console.log('Host Name: ', mongoose.connection.host);
})
.catch((error) => {
    console.log(error);
});


const interventionRoutes = require('./Routes/Intervention.route');
app.use('/api/interventions', interventionRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({ 
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});