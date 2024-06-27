const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const port = 3000;
const path = require('path');
require('dotenv').config();

//db connection
mongoose.connect(process.env.DB_URI)
.then(()=>console.log("DB Connection Successfull!!"))
.catch((err)=>console.log("DB Err-->",err));

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/',require('./routes'));

app.use(express.static(path.join(__dirname,'../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});