var mongoose = require('mongoose');
var court_bill_model = require('../models/court_bill_model');
const url = require('url');

exports.get_court_bill = (req, res) => {
    console.log(req.query)
    let condition = {
        _id: req.query._id,
        time_check_in: (req.query.time_check_in),
        time_check_out: (req.query.time_check_out),
        status: (req.query.status),
        court_area_id: (req.query.court_area_id)
    }

    Object.keys(condition).forEach(key=>{
        if(condition[key] == undefined){
            delete condition[key]
        }else{
            switch (key) {
                case "status": condition[key] = Boolean(condition[key]) ;break;
                case "court_area_id" : condition[key] = mongoose.mongo.ObjectId(condition[key]) ;break;
                case "time_check_in": condition[key] = new Date(condition[key]) ;break;
                case "time_check_out": condition[key] = new Date(condition[key]) ;break;
                case "_id": condition[key] =condition[key];break;
            }
        }
    })

    console.log(condition)

    court_bill_model
        .find(condition, (err, list) => {
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

exports.get_bill_by_court_area = (req, res) =>{
    court_bill_model
        .findOne({court_area_id: mongoose.mongo.ObjectID(req.params.court_area_id), status: false})
        .exec((err, list)=>{
            err?
                res.status(500).send('cannot get court_bill')
                :
                res.json(list);
        });
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

exports.update_bill_status = async (req, res) => {
    console.log(req.params._id)
    await court_bill_model
        .findByIdAndUpdate({_id: req.params._id}, {$set: {status: true, time_check_out: new Date().getDate()}}, {new: true}, err=>{
            err? console.log(err)
                :
                res.status(200).send('Cập nhật thành công');
        })
}


