const product = require('../models/product_model');
const court_bill_detail = require('../models/court_bill_detail_model');
const user_bill_detail = require('../models/user_bill_detail_model');

exports.get_product = (req, res) => {
    let queries = req.query;
    console.log(queries)
    product
        .find(queries)
        .populate('promotion_id')
        .populate('product_category_id')
        .exec((err, list) => {
            err ?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
}

exports.get_all_on_shop_page = (req, res) => {
    product.find({on_shop_page: true, quantity: {$gte: 1}})
        .populate('promotion_id')
        .exec((err, list) => {
            err ?
                res.status(500).send('Can not get list')
                :
                res.json(list);

        })
}

exports.get_product_by_category = (req, res) => {
    console.log(typeof req.params.product_category_id);
    product
        .find({product_category_id: req.params.product_category_id})
        .exec((err, list) => {
            err ?
                res.status(500).json('cannot get list')
                :
                res.json(list);
        })
}

exports.get_product_by_category_on_shoppage = (req, res) => {
    product
        .find({product_category_id: req.params.product_category_id, on_shop_page: true, quantity: {$gte: 1}})
        .exec((err, list) => {
            err ?
                res.status(500).json('cannot get list')
                :
                res.json(list);
        })
}

exports.get_product_by_court = (req, res) => {
    let onComplte = (list) => {
        if (list.length !== 0) {
            list = list.filter(area => area.product_category_id !== null);
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
        product
            .find()
            .populate({
                path: 'product_category_id',
                match: {court_id: req.params.court_id}
            })
            .exec((err, list) => {
                taskToGo = 1;
                onComplte(list)
            })
    }
}

exports.get_product_by_court_on_shoppage = (req, res) => {
    let onComplte = (list) => {
        if (list.length !== 0) {
            list = list.filter(area => area.product_category_id !== null);
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
        product
            .find({on_shop_page: true, quantity: {$gte: 1}})
            .populate({
                path: 'product_category_id',
                match: {court_id: req.params.court_id}
            })
            .populate('promotion_id')
            .exec((err, list) => {
                taskToGo = 1;
                onComplte(list)
            })
    }
}

exports.get_product_by_court_id = (req, res) => {
    let onComplte = (list) => {
        if (list.length !== 0) {
            list = list.filter(area => area.product_category_id !== null);
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
        product
            .find()
            .populate({
                path: 'product_category_id',
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

exports.get_product_sale = (req, res) => {
    let time = new Date('2021-05-28T00:00:00.000Z')
    product
        .aggregate([
                {
                    $lookup: {
                        from: "promotions",
                        localField: 'promotion_id',
                        foreignField: '_id',
                        as: "promotion_id",
                    }
                },
                {
                    $unwind: '$promotion_id'
                },
                {
                    $addFields: {promotion_end_time: '$promotion_id.end'}
                },
                {
                    $match: {promotion_end_time: {$gte: time}}
                }
            ]
        )
        .exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
                res.status(200).json(result);
            }
        })
}

exports.get_court_by_product = (req, res) => {
    console.log(req.params)
    product
        .findOne({_id: req.params._id})
        .populate({
            path: 'product_category_id',
            populate: {
                path: 'court_id'
            }
        })
        .exec((err, product) => {
            err ?
                console.log(err)
                :
                res.status(200).json(product.product_category_id.court_id)
        })
}

exports.check_quantity_remain = (req, res) => {
    product.findOne({_id: req.params.product_id}, (err, product) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({quantity: product.quantity})
        }
    })
        .catch((err) => {
            res.status(400).send('Something wrong');
        })
}

exports.add_one_product = (req, res) => {
    let item = new product(req.body);
    item
        .save()
        .then((item) => {
            res.status(200).json({message: 'Đã thêm thành công'})
        })
        .catch((err) => {
            res.json({message: 'Thêm thất bại'});
        })

}

exports.update_one_row = (req, res) => {
    let objUpdate = new product(req.body);
    let id = req.params._id;

    product
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

    court_bill_detail.remove({product_id: {$in: req.body}})
    user_bill_detail.remove({product_id: {$in: req.body}});

    product
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
}

exports.search = (req, res) => {
    let search_content = req.params.search_content;
    product
        .find({name: {'$regex': search_content, '$options': 'i'}, quantity: {$gte: 1}})
        .populate({
            path: 'promotion_id'
        })
        .exec((err, list)=>{
            if (err) {
                console.log(err)
            }
            else {
                res.json(list)
            }
        })
}