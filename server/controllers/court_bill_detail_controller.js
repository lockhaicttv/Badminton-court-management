var court_bill_detail = require('../models/court_bill_detail_model');

exports.get_bill_detail = (req, res) => {
    court_bill_detail
        .find()
        .populate('court_bill_id')
        .populate('product_id')
        .exec((err, list) => {
            err ?
                res.status(500).send('Cannot get list bill details')
                :
                res.json(list);
        })
}

exports.get_bill_detail_by_billID = (req, res) => {
    court_bill_detail
        .find({court_bill_id: req.params.court_bill_id})
        .populate('product_id')
        .exec((err, list) => {
            err ?
                res.status(500).send('Cannot get list bill details')
                :
                res.json(list);
        })
}

exports.add_one_bill_detail = (req, res) => {
    console.log(req.body)
    let item = new court_bill_detail(req.body)
    let bill_id = req.body.court_bill_id;
    court_bill_detail.find({court_bill_id: bill_id}, (err, list) => {
            if (err)
                console.log(err)
            else {
                if (list.length) {
                    let index = 0;
                    let isUpdate = false;
                    for (let i = 0; i < list.length; ++i) {
                        console.log(String(item.product_id)===String( list[i].product_id))
                        if (String(list[i].product_id) === String(item.product_id)) {
                            console.log(i)
                            index = i;
                            let oldQuantity = list[index].quantity;
                            let newQuantity = item.quantity + oldQuantity;
                            court_bill_detail.findByIdAndUpdate({_id: list[index]._id}, {$set: {quantity: newQuantity}}, {new: true},
                                err => {
                                    err ?
                                        console.log(err)
                                        :
                                        res.status(200).send('Update số lượng thành công');
                                })
                            isUpdate = true;
                            break;
                        }
                    }
                    if (!isUpdate) {
                        item.save()
                            .then((new_bill_detail) => {
                                res.status(200).json({message: 'Thêm thành công'});
                            })
                            .catch(() => {
                                res.status(400).send('Something went wrong');
                            })
                    }
                } else {
                    item.save()
                        .then((new_bill_detail) => {
                            res.status(200).json({message: 'Thêm thành công'});
                        })
                        .catch(() => {
                            res.status(400).send('Something went wrong');
                        })
                }
            }
        }
    )
}

