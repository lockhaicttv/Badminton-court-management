var mongoose = require('mongoose');
var user_bill = require('../models/user_bill_model');
const url = require('url');

exports.get_user_bill = (req, res) => {
    user_bill
        .find({}, (err, list) => {
            console.log(list);
            err ?
                res.status(500).send(`cannot get list`)
                :
                res.json(list)
        })
        .catch(err => {
            res.status(400).send(`Something went wrong`);
        })
}

exports.get_user_bill_by_account = (req, res) => {
    user_bill
        .find({
            user_id: req.params.user_id
        })
        .exec((err, list) => {
            err ?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
}

exports.add_one_bill = (req, res) => {
    let item = new user_bill(req.body);
    item
        .save()
        .then(item => {
            res.status(200).json({message: `Đã thêm thành công!`});
        })
        .catch(
            err => {
                res.status(400).json({message: `Thêm thất bại`});
            }
        )
}

exports.update_bill_status = async (req, res) => {
    console.log(req.params._id)
    await user_bill
        .findByIdAndUpdate({_id: req.params._id}, {
            $set: {
                status: true,
                pay_time: new Date().getDate()
            }
        }, {new: true}, err => {
            err ? console.log(err)
                :
                res.status(200).send('Cập nhật thành công');
        })
}

exports.delete = (req, res) => {
    let objDel = {
        _id: {
            $in: req.body
        }
    }
    user_bill
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
}


