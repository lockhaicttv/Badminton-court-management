const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const mongoose = require('mongoose');
const db = require('./db');
const global_var = require('./global_variables')
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//import routes
let user_route = require("./route/user_route");


//use route
app.use("/users", user_route);


//connect db
mongoose.Promise = global.Promise;
mongoose
    .connect(db.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log(`Database is connected!`);
        },
        (err) => {
            console.log(`Can not connect database! ${err}`);
        }
    );

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});