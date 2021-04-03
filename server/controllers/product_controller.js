var product = require('../models/product_model');

exports.get_product = (req, res) => {
    let queries = req.query;
    console.log(queries)
    product
        .find(queries, (err, list) => {
            err ?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
        .catch(() => {
            res.status(400).send('Something went wrong');
        });
}

exports.get_all_on_shop_page = (req, res) => {
    product.find({on_shop_page: true}, (err, list) => {
        err ?
            res.status(500).send('Can not get list')
            :
            res.json(list);

    }).catch(() => {
        res.status(400).send(`somthing went wrong`);
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
        .find({product_category_id: req.params.product_category_id, on_shop_page: true})
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

exports.get_product_by_account_id = (req, res) => {
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
                populate:
                    {
                        path: 'account_id',
                        match: {account_id: req.params.account_id}
                    }
            })
            .exec((err, list) => {
                taskToGo = 1;
                onComplte(list)
            })
    }
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
    product
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
}