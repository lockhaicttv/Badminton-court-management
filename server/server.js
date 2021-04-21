const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const http = require("http").createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
    }
});

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
}))

const mongoose = require('mongoose');
const db = require('./db');
const global_var = require('./global_variables')
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//import routes
let account_route = require("./route/account_route");
let user_route = require('./route/user_route');
let court_route = require("./route/court_route");
let court_area_route = require('./route/court_area_route');
let product_category_route = require('./route/product_category_route');
let product_route = require('./route/product_route');
let court_bill_route = require('./route/court_bill_route');
let court_bill_detail_route = require('./route/court_bill_detail_route');
let user_bill_route = require('./route/user_bill_route');
let user_bill_detail_route = require('./route/user_bill_detail_route')

//use route
app.use("/account", account_route);
app.use('/user', user_route);
app.use("/court", court_route);
app.use("/court_area", court_area_route)
app.use("/product_category", product_category_route);
app.use('/product', product_route);
app.use('/court_bill', court_bill_route);
app.use('/court_bill_detail', court_bill_detail_route);
app.use('/user_bill', user_bill_route);
app.use('/user_bill_detail', user_bill_detail_route);


//connect db
mongoose.Promise = global.Promise;
mongoose
    .connect(db.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        () => {
            console.log(`Database is connected!`);
        },
        (err) => {
            console.log(`Can not connect database! ${err}`);
        }
    );

//socket
io.on('connection', socket => {
    socket.on('message', ({name, message}) => {
        console.log(name, message)
        socket.emit('message', {name, message})
    })
})


http.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});