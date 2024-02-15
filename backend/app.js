const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://cluster0.rbrla8m.mongodb.net/',
    {
    dbName: 'intervention',
    user: 'user',
    pass: 'hDiwBGO4VQz7WQO9'
    })
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.log(error);
});

// Routes
const interventionRoutes = require('./Routes/Intervention.route');
app.use('/api/interventions', interventionRoutes);

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