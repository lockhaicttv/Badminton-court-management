var product = require('../models/product_model');

exports.get_product = (req, res)=>{
    product
        .find((err, list)=>{
            err?
                res.status(500).send('Cannot get list')
                :
                res.json(list);
        })
        .catch(()=>{
            res.status(400).send('Something went wrong');
        });
}

exports.get_product_by_category = (req, res)=>{
    console.log(typeof req.params.product_category_id);
    product
        .find({product_category_id: req.params.product_category_id})
        .exec((err, list)=>{
            err?
                res.status(500).json('cannot get list')
            :
                res.json(list);
        })
}

exports.add_one_product = (req, res) =>{
    let item = new product(req.body);
    item
        .save()
        .then((item)=>{
            res.status(200).json({message: 'Đã thêm thành công'})
        })
        .catch((err)=>{
            res.json({message: 'Thêm thất bại'});
        })

}
