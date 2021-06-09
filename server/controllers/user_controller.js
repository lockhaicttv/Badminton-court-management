var user = require('../models/user_model');
const mongoose = require('mongoose')

exports.get_user = (req, res) => {
    let queries = req.query;
    queries['_id'] = mongoose.mongo.ObjectID(req.query._id);
    user
        .find(queries,(err, list) => {
            err ?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send('Something went wrong');
        });
}

exports.add_one_user = (req, res) => {
    let item = new user(req.body);
    item
        .save()
        .then((item) => {
            res.status(200).json({message: 'Thêm tài khoản thành công thành công'})
        })
        .catch((err) => {
            res.json({message: 'Thêm thất bại'});
        })
        .catch(()=>{
            res.status(400).send('Something wrong')
        })
}

exports.update_one_row = (req, res) => {
    let objUpdate = new user(req.body);
    let id = req.params._id;
    console.log(id, req.body)
    user
        .findByIdAndUpdate({_id: id}, req.body, {new: true}, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).send('Update thành công');
            }
        })
        .catch(()=>{
            res.status(400).send('Something wrong')
        })
}

exports.delete = (req, res) => {
    let objDel = {
        _id: {
            $in: req.body
        }
    }
    user
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
        .catch(()=>{
            res.status(400).send('Something wrong')
        })
}

exports.check_exist = (req, res) => {
    let username = req.params.username;
    user
        .findOne({username: username}, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result === null) {
                    res.status(200).json({message: 'Tài khoản có thể dùng'});
                } else {
                    res.status(200).json({message: 'Tài khoản đã tồn tại'});
                }
            }
        })
        .catch(err=>{
            res.status(400).send('Something went wrong');
        })
}