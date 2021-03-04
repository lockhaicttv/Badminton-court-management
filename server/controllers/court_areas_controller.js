var court_areas_model = require('../models/court_areas_models');

exports.get_list_court_areas = (req, res) =>{
    let queries = req.query;
    console.log(queries);
    court_areas_model
        .find(queries,(err, list)=>{
            if (err) {
                res.status(500).send(`Can not get list`);
            }
            else {
                res.json(list);
            }
        })
        .catch((err)=>{
            res.status(500).send(`something went wrong`);
        })
}

exports.add_one_court_area = (req, res) =>{
    let item = new court_areas_model(req.body);
    item.save()
        .then((item)=>{
        res.status(200).json({message:"Đã thêm thành công"})
    })
        .catch((err)=>{
            res.json({message: "Thêm thất bại"});
        })
}

exports.update_status = (req, res) =>{
    let status = "true" === req.query.status;
    court_areas_model
        .findByIdAndUpdate({_id: req.query._id}, {$set: {status: status}}, {new: true}, (err, result)=>{
            err?
                res.status(500).send('Update fail')
                :
                res.status(200).send('Update success');
        });
}