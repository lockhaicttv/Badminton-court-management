var mongoose = require('mongoose');
var user_bill = require('../models/user_bill_model');
var user_bill_detail = require('../models/user_bill_detail_model');
var product = require('../models/product_model');
const url = require('url');

exports.get_user_bill = (req, res) => {
    user_bill
        .find({},)
        .populate('user_id')
        .exec((err, list) => {
            console.log(list);
            err ?
                res.status(500).send(`cannot get list`)
                :
                res.json(list)
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

exports.get_by_court_id = (req, res) => {
    user_bill.find({court_id: req.params.court_id})
        .populate('user_id')
        .exec((err, list) => {
            err ?
                console.log(err)
                :
                res.status(200).json(list);
        })
}

//For payment on client side, add bill and bill details
exports.add_one_bill = async (req, res) =>{
    console.log(req.body.bill_details)
    let finishTask = 0;
    let bill = new user_bill(req.body.bill);
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
    console.log('sau khi map', listBillDetails)

    bill
        .save(err => {
            if (err) {
                res.status(400).send('Thanh toán thất bại');
            } else {
                user_bill_detail.create(listBillDetails)
                    .then((list) => {
                        listBillDetails.forEach(billDetail => {
                                product.findOne({_id: billDetail.product_id}, (err, newBillDetails) => {
                                    if (err) {
                                        console.log(err)
                                    } else {

                                        newBillDetails.quantity = newBillDetails.quantity - billDetail.quantity
                                        console.log('Sau khi trừ số lượng', newBillDetails)
                                        newBillDetails.save((err, updateBllDetail) => {
                                            if (err) {
                                                console.log(err)
                                                finishTask = 0;
                                            } else {
                                                finishTask = 1;
                                            }
                                        })
                                    }
                                })
                            }
                        )
                        res.status(200).send('Thanh toán thành công');
                    })
                    .catch(() => {
                        res.status(400).send('Thanh toán thất bại');
                    })
            }
        })

}

exports.statistic = (req, res) => {
    let start = new Date(req.query.start);
    let end = new Date(req.query.end);
    let court_id = mongoose.Types.ObjectId(req.params.court_id);
    user_bill.aggregate([
        {
            $match: {
                court_id: court_id,
                pay_time: {$gte: start, $lte: end}
            }
        },
        {
            $group: {
                _id: {$dateToString: {format: '%d-%m-%Y', date: '$pay_time'}},
                balance: {$sum: "$price_total"},
            },
        },
        {$sort: {_id: 1}}
    ])
        .exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
                res.status(200).json(result);
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

exports.update_one_row = (req, res) => {
    let id = req.params._id;

    user_bill
        .findByIdAndUpdate({_id: id}, req.body, {new: true}, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).send('Update thành công');
            }
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


