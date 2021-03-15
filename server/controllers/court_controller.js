var court_model = require('../models/court_model');

exports.get_list_court = (req, res) =>{
    court_model
        .find((err, list)=>{
            if (err) {
                res.status(500).send(`something went wrong`);
            }
            else {
                res.json(list);
            }})
        .catch((err)=>{
            res.status(400).send(`database unreachable`)
        });
};

exports.get_court_by_account = (req, res) =>{
    console.log(req.params.account_id);
    court_model
        .findOne({account_id: req.params.account_id})
        .populate('account_id')
        .exec((err, court)=>{
            if (err) {
                res.status(500).send(`something went wrong`);
            }
            else {
                res.json(court);
            }
        })
}

exports.add_one_court = (req, res)=>{
    let item = new court_model(req.body);
    item.save()
        .then((item)=>{
            res.status(200).json({message: "Đã thêm thông tn sân"});
        })
        .catch((err)=>{
            res.json({message: 'Thêm thất bại'});
        })
}