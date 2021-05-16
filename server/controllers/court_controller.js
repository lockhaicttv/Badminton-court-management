var court_model = require('../models/court_model');
var court_area_model = require('../models/court_areas_models')

exports.get_list_court = (req, res) => {
    court_model
        .find({})
        .populate('account_id')
        .exec((err, list) => {
            if (err) {
                res.status(500).send(`something went wrong`);
            } else {
                res.json(list);
            }
        })
};

exports.get_court_by_account = (req, res) => {
    court_model
        .findOne({account_id: req.params.account_id})
        .populate('account_id')
        .exec((err, court) => {
            if (err) {
                res.status(500).send(`something went wrong`);
            } else {
                res.json(court);
            }
        })
}

exports.get_court_by_id = (req, res) => {
    court_model
        .findOne({_id: req.params._id})
        .populate('account_id')
        .exec((err, court) => {
            if (err) {
                res.status(500).send(`something went wrong`);
            } else {
                res.json(court);
            }
        })
}

exports.add_one_court = (req, res) => {
    let item = new court_model(req.body);
    console.log(item)
    let court_area_arr = []
    for (let i=0; i<req.body.court_total; i++){
        let court_area_item = {
            area: i+1,
            status: false,
            description: '',
            court_id: item._id,
            price: req.body.court_price
        }
        court_area_arr.push(court_area_item)
    }
    item.save()
        .then((item) => {
            court_area_model.create(court_area_arr)
                .then((err, list)=>{
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.status(200).json({message: "Đã thêm thông tn sân", court_id: item._id});
                    }
                })
                .catch((err)=>{
                    res.status(400).send('Khởi tạo sân thất bại');
                })
        })
        .catch((err) => {
            res.json({message: 'Thêm thất bại'});
        })
}

exports.edit_banner = (req, res) =>{
    let objUpdate = {};
    objUpdate[req.params.field_name] = req.body;
    court_model
        .findByIdAndUpdate({_id: req.params.court_id}, {$set: objUpdate}, {new: true}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send(`Thay đổi banner thành công`);
            }
        })
}

exports.update_one_row = (req, res) => {
    let objUpdate = new court_model(req.body);
    let id = req.params._id;
    console.log(id, req.body)
    court_model
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
    court_model
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
        .catch(()=>{
            res.status(500).send('Something wrong')
        })
}

