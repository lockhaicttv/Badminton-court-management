var account_model = require('../models/account_model');

exports.get_list_account = (req, res) =>{
    account_model
        .find((err, list) =>{
            if (err) {
                console.log(err);
                res.status(500).send(`something went wrong`);
            } else {
                res.json(list);
            }
        })
        .catch((err)=>{
            res.status(400).send(`Unable to get to database`);
        })
};

exports.add_one_account = (req, res) =>{
    let item = new account_model(req.body);
    console.log(item);
    item.save()
        .then((item) =>{
           res.status(200).json({message: "Tài khoản đã được tạo thành công"})
           })
        .catch((err)=>{
            res.json({message: "Tài khoản thất bại"})
            })

};
