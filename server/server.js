const express = require('express');
const axios = require('axios')
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const http = require("http").createServer(app);
const { v4: uuidv4 } = require("uuid");
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
let promotion_route = require('./route/promotion_route')
let message_route = require('./route/message_route')
let ai_service_route = require('./route/ai_service_route')
let court_booking_route = require('./route/court_booking_route')


//use route
app.use("/account", account_route);
app.use('/user', user_route);
app.use("/court", court_route);
app.use("/court_area", court_area_route)
app.use("/product_category", product_category_route);
app.use('/product', product_route);
app.use('/promotion', promotion_route)
app.use('/court_bill', court_bill_route);
app.use('/court_bill_detail', court_bill_detail_route);
app.use('/user_bill', user_bill_route);
app.use('/user_bill_detail', user_bill_detail_route);
app.use('/court_booking', court_booking_route);
app.use('/message', message_route);
app.use('/chat-bot', ai_service_route)

//controller
let message_controller = require('./controllers/message_controller');


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
let run = (socket) => {
    console.log();
    console.log(`====New client connected at: ${socket.handshake.address} ====`);

    socket.emit('message', {
        name: 'Upin',
        message: 'Xin chào, mình là Upin. Rất vui được gặp bạn!'
    })

    socket.on("message", (data) => {
        let message_item = {
            message: data.message,
            response: ''
        }
        try {
            axios
                .post(`${global_var.SERVER_PYTHON}/chat-bot/predict`, {
                    input: data,
                })
                .then((res) => {
                    message_item['response'] = res.data.response;
                    message_controller.add_message(message_item);
                    socket.emit("message", {
                        name: 'Upin',
                        message: res.data.response
                    });
                })
                .catch((err) => {
                    if (err.code === "ECONNREFUSED") {
                        socket.emit("message", {
                            name: 'Upin',
                            message:
                                "Hic...hic, kết nối tới chatbot có vấn đề rồi! Bạn vui lòng thử lại trong giây lát nha!",
                            time: new Date()
                        });
                    } else {
                        socket.emit("message", {
                            name: 'Upin',
                            message: "Đã có lỗi xảy ra. Bạn vui lòng kết nối lại sau nhen!",
                        });
                    }
                });
        } catch (err) {
            console.log(err);
            socket.emit("message", {
                name: 'Upin',
                message: "Đã có lỗi xảy ra. Bạn vui lòng kết nối lại sau nhen!",
            });
        }
    });
};

io.on('connection', run)


http.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});