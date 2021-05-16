var court_areas_model = require('../models/court_areas_models');
const mongoose = require('mongoose');
exports.get_list_court_areas = (req, res) =>{
    let queries = req.query;
    court_areas_model
        .find(queries,(err, list)=>{
            if (err) {
                res.status(500).send(`Can not get list`);
            }
            else {
                res.json(list);
            }
        })
        .catch((err)=>{
            res.status(500).send(`something went wrong`);
        })
}

exports.get_list_area_by_account = async (req, res) => {
    let onComplte = (list) =>{
        if (list.length!==0){
            list = list.filter(area=>area.court_id!==null);
            res.status(200).json(list)
        }
        else {
            res.status(200).send('Thất bại');
        }

    }
    let taskToGo = 1;
    let list = [];
    if (taskToGo === 0){
        onComplte(list);
    } else {
        await court_areas_model
            .find()
            .populate({
                path: 'court_id',
                match: {account_id: mongoose.mongo.ObjectID(req.params.account_id)},
                select: 'name'
            })
            .exec((err, list)=>{
                if (err) {
                    console.log(err);
                }
                else {
                    taskToGo = 1;
                    onComplte(list);
                }
            })
    }
}

exports.add_one_court_area = (req, res) =>{
    let item = new court_areas_model(req.body);
    item.save()
        .then((item)=>{
        res.status(200).json({message:"Đã thêm thành công"})
    })
        .catch((err)=>{
            res.json({message: "Thêm thất bại"});
        })
}

exports.update_status = (req, res) =>{
    let status = "true" === req.query.status;
    court_areas_model
        .findByIdAndUpdate({_id: req.query._id}, {$set: {status: status}}, {new: true}, (err, result)=>{
            err?
                res.status(500).send('Update fail')
                :
                res.status(200).send('Update success');
        });
}

exports.update_one_row = (req, res) => {
    let id = req.params._id;
    console.log(req.body)
    court_areas_model
        .findByIdAndUpdate({_id: mongoose.mongo.ObjectID(id)}, req.body, {new: true}, (err, result)=>{
            if (err)
                console.log(err);
            else {
                res.status(200).send('Update thành công');
            }
        })
}

exports.delete = (req, res) => {
    let objDel = {
        _id:{
            $in: req.body
        }
    }
    court_areas_model
        .deleteMany(objDel, (err, result)=>{
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).send('Xoá thành công');
            }
        })
}