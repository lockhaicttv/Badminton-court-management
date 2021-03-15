var product_category = require('../models/product_category_model');
const mongoose = require('mongoose')

exports.get_product_category = (req, res) => {
    product_category
        .find((err, list) => {
            err ?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
        .catch(() => {
            res.status(400).send('Something went wrong');
        });
}


exports.get_product_category_by_account = (req, res) => {
    product_category
        .find({account_id: req.params.account_id}, 'name')
        .exec((err, product) => {
            if (err) {
                res.status(500).send(`something went wrong`);
            } else {
                res.json(product);
            }
        })
}

exports.add_product_category = (req, res) => {
    let item = new product_category(req.body);
    item.save()
        .then((item) => {
            res.status(200).json({message: 'Đã thêm thành công'});
        })
        .catch((err) => {
            res.json({message: 'Thêm thất bại'});
        })
}

exports.update_one_row = (req, res) => {
    let objUpdate = new product_category(req.body);
    let id = req.params._id;

    product_category
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
    product_category
        .deleteMany(objDel, (err, result)=>{
            if (err) {
                console.log(err)
            }
            else {
                res.status(200).send('Xoá thành công');
            }
        })
}