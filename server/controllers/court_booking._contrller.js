const court_booking = require('../models/court_booking_model');

exports.get_all_court_booking = (req, res) => {
    court_booking.find({}, (err, list) => {
        err ?
            res.status(500).send('Can not get list')
            :
            res.status(200).json(list)

    })
        .catch((err) => {
            res.status(400).send('Something wrong')
        })
}

exports.get_all_court_booking_by_court_id = (req, res) => {
    court_booking.find()
        .populate({
            path: 'court_area_id',
            match: {court_id: req.params.court_id}
        })
        .exec((err, list) => {
            err ?
                res.status(500).send('Can not get list')
                :
                res.status(200).json(list)

        })
}


exports.add_one_row = (req, res) => {
    let item = new court_booking(req.body);
    item
        .save()
        .then(item => {
            res.status(200).json({message: 'Đã thêm thành công'});
        })
        .catch(() => {
            res.status(500).send('Something wrong')
        })
}

exports.update_one_row = (req, res) => {
    let objUpdate = new court_booking(req.body);
    let id = req.params._id;
    console.log(id, req.body)
    court_booking
        .findByIdAndUpdate({_id: id}, req.body, {new: true}, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.status(200).send('Update thành công');
            }
        })
        .catch(() => {
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
    court_booking
        .deleteMany(objDel, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send('Xoá thành công');
            }
        })
        .catch(() => {
            res.status(500).send('Something wrong')
        })
}