const axios = require("axios");
const global_var = require("../global_variables");

exports.handle_function = (req, res) => {
    let data = req.body.data;
    let func = req.params.func;
    axios
        .post(`${global_var.SERVER_PYTHON}/chat-bot/${func}`, {
            data: data,
        })
        .then((response) => {
            res.json(response.data);
        })
        .catch(err=>{
            res.json('Lỗi 404')
        });
};