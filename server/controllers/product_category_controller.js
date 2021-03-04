var product_category = require('../models/product_category_model');

exports.get_product_category = (req, res) =>{
    product_category
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


exports.get_product_category_by_account = (req, res) =>{
    product_category
        .find({account_id: req.params.account_id}, 'name')
        .exec((err, product)=>{
            if (err) {
                res.status(500).send(`something went wrong`);
            }
            else {
                res.json(product);
            }
        })
}

exports.add_product_category = (req, res) =>{
    let item = new product_category(req.body);
    item.save()
        .then((item)=>{
            res.status(200).json({message:'Đã thêm thành công'});
        })
        .catch((err)=>{
            res.json({message:'Thêm thất bại'});
        })
}