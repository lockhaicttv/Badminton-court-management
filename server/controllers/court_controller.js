var court_model = require('../models/court_model');

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
    item.save()
        .then((item) => {
            res.status(200).json({message: "Đã thêm thông tn sân"});
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

