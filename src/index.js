const express = require('express');
const app = express();

const cors = require('cors')

const mongoose = require('mongoose');

const morgan = require('morgan');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/react-express-starter')
        .then(db => console.log('DB is connected'))
        .catch(err => console.err(err))

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/tasks', require('./routes/tasks'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });  

//Statis files
// app.use(express.static(__dirname + '/public'));

app.use("*", (req,res)=>{
    res.end("Apis is working!!!")
})

app.listen(port, () => {
    console.log(`Server running port ${port}`);
});
