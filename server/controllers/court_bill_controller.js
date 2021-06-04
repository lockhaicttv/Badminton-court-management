var mongoose = require('mongoose');
var court_bill_model = require('../models/court_bill_model');
const url = require('url');

exports.get_court_bill = (req, res) => {
    console.log(req.query)
    // let condition = {
    //     _id: req.query._id,
    //     time_check_in: (req.query.time_check_in),
    //     time_check_out: (req.query.time_check_out),
    //     status: (req.query.status),
    //     court_area_id: (req.query.court_area_id)
    // }
    //
    // // Object.keys(condition).forEach(key => {
    // //     if (condition[key] == undefined) {
    // //         delete condition[key]
    // //     } else {
    // //         switch (key) {
    // //             case "status":
    // //                 condition[key] = Boolean(condition[key]);
    // //                 break;
    // //             case "court_area_id" :
    // //                 condition[key] = mongoose.mongo.ObjectId(condition[key]);
    // //                 break;
    // //             case "time_check_in":
    // //                 condition[key] = new Date(condition[key]);
    // //                 break;
    // //             case "time_check_out":
    // //                 condition[key] = new Date(condition[key]);
    // //                 break;
    // //             case "_id":
    // //                 condition[key] = condition[key];
    // //                 break;
    // //         }
    // //     }
    // // })
    // //
    // // console.log(condition)

    court_bill_model
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

exports.get_bill_by_court_area = (req, res) => {
    court_bill_model
        .findOne({court_area_id: mongoose.mongo.ObjectID(req.params.court_area_id), status: false})
        .exec((err, list) => {
            err ?
                res.status(500).send('cannot get court_bill')
                :
                res.json(list);
        });
}

exports.get_court_bill_by_court = (req, res) => {
    let onComplte = (list) => {
        if (list.length !== 0) {
            list = list.filter(bill => bill.court_area_id !== null);
            res.status(200).json(list)
        } else {
            res.status(200).send('Thất bại');
        }

    }
    let taskToGo = 1;
    let list = [];
    if (taskToGo === 0) {
        onComplte(list);
    } else {
        court_bill_model
            .find()
            .populate({
                path: 'court_area_id',
                match: {
                    court_id: req.params.court_id
                }
            })
            .exec((err, list) => {
                taskToGo = 1;
                onComplte(list)
            })
    }
}

exports.statistic = (req, res) => {
    let start = new Date(req.query.start);
    let end = new Date(req.query.end);
    let court_id = mongoose.Types.ObjectId(req.params.court_id);
    console.log(start, end)
    court_bill_model.aggregate([
        {
            $lookup: {
                from: "court_areas",
                localField: 'court_area_id',
                foreignField: '_id',
                as: "court_areas",
            }
        },
        {
            $unwind: '$court_areas'
        },
        {
            $addFields: {court_id: '$court_areas.court_id'}
        },
        {
            $match: {
                court_id: court_id,
                time_check_out: {$gte: start, $lte: end}
            }
        },
        {
            $group: {
                _id: {$dateToString: {format: '%d-%m-%Y', date: '$time_check_out'}},
                balance: {$sum: "$price_total"},
            },
        },
        {$sort: {_id: -1}}
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

exports.add_one_bill = (req, res) => {
    let item = new court_bill_model(req.body);
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

exports.update_bill_status = (req, res) => {
    let utc = new Date();
    utc.setHours( utc.getHours() + 7);
    console.log(utc)

    court_bill_model
        .findByIdAndUpdate({_id: req.params._id}, {
            $set: {
                status: true,
                time_check_out: utc,
                price_total: req.body.price_total * 1
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
    court_bill_model
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
}


