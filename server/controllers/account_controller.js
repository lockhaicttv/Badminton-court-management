var account_model = require('../models/account_model');
var user_model = require('../models/user_model');
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

exports.check_login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password)
    account_model.findOne({username: username, password_1: password}, (err, account)=>{
        if (err)
            console.log(err)
        else {
            if (account !== null){
                res.status(200).json({message: 'Đăng nhập thành công'})
            }
            else {
                user_model.findOne({username: username, password: password}, (err, user)=>{
                    if (err)
                        console.log(err)
                    else {
                        if (user !== null) {
                            res.status(200).json({message: 'Đăng nhập thành công'});
                        } else {
                            res.status(500).send('Something went wrong');
                        }
                    }
                })
            }
        }
    }).catch(()=>{
        res.status(400).send('Tài khoản hoặc mật khẩu không tồn tại');
    })

}
