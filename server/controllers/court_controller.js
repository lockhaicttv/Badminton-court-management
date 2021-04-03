var court_model = require('../models/court_model');

exports.get_list_court = (req, res) => {
    court_model
        .find((err, list) => {
            if (err) {
                res.status(500).send(`something went wrong`);
            } else {
                res.json(list);
            }
        })
        .catch((err) => {
            res.status(400).send(`database unreachable`)
        });
};

exports.get_court_by_account = (req, res) => {
    console.log(req.params.account_id);
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