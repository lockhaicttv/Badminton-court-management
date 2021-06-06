const promotion = require('../models/promotion_model')
const product = require('../models/product_model')

exports.get_all_promotion = (req, res) => {
    let queries = req.query;
    console.log(queries)
    promotion.find(queries, (err, list)=>{
        err?
            res.status(500).send('Can not get list')
            :
            res.status(200).json(list)

    })
        .catch((err)=>{
            res.status(400).send('Something wrong')
        })
}

exports.get_by_court = (req, res) => {
    let queries = req.query;
    console.log(queries)
    promotion.find({court_id: req.params._id}, (err, list)=>{
        err?
            res.status(500).send('Can not get list')
            :
            res.status(200).json(list)

    })
        .catch((err)=>{
            res.status(400).send('Something wrong')
        })
}


exports.add_one_row = (req, res) => {
    let item = new promotion(req.body);
    item
        .save()
        .then(item=> {
            res.status(200).json({message: 'Đã thêm thành công'});
        })
        .catch(()=>{
            res.status(500).send('Something wrong')
        })
}

exports.update_one_row = (req, res) => {
    let objUpdate = new promotion(req.body);
    let id = req.params._id;
    console.log(id, req.body)
    promotion
        .findByIdAndUpdate({_id: id}, req.body, {new: true}, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).send('Update thành công');
            }
        })
        .catch(()=>{
            res.status(500).send('Something wrong')
        })
}

exports.delete = (req, res) => {
    let objDel = {
        _id: {
            $in: req.body
        }
    }
    let listPromotionId = req.body
    promotion
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                listPromotionId.forEach(promotion_id=>{
                    product.updateMany({promotion_id: promotion_id}, {promotion_id: null}, {new: true}, err=>{
                        err?
                            console.log(err)
                            :
                            console.log(promotion_id)
                    })
                })
                res.status(200).send('Xoá thành công');
            }
        })
        .catch(()=>{
            res.status(500).send('Something wrong')
        })
}