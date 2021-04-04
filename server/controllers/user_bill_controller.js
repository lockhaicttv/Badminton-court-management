var mongoose = require('mongoose');
var user_bill = require('../models/user_bill_model');
var user_bill_detail = require('../models/user_bill_detail_model');
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

//For payment on client side, add bill and bill details
exports.add_one_bill = async (req, res) => {
    let bill = new user_bill(req.body.bill);
    console.log(req.body.bill)
    let listBillDetails = [];
    if (req.body.bill_details.length > 0) {
        listBillDetails = req.body.bill_details
            .map(old_bill_detail =>
                (
                    new user_bill_detail(
                        {
                            product_id: old_bill_detail.productId,
                            user_bill_id: bill._id,
                            quantity: old_bill_detail.quantity * 1
                        }
                    )
                )
            )
    }

    bill
        .save(err => {
           if (err) {
               res.status(400).send('Thanh toán thất bại');
           }
           else {
               user_bill_detail.create(listBillDetails)
                   .then((list)=>{
                       res.status(200).send('Thanh toán thành công');
                   })
                   .catch(()=>{
                       res.status(400).send('Thanh toán thất bại');
                   })
           }
        })

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


