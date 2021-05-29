const court_booking = require('../models/court_booking_model');
const mongoose = require('mongoose');

exports.get_all_court_booking = (req, res) => {
    court_booking.find({}, (err, list) => {
        if (err) {
            res.status(500).send('Can not get list')
        } else {
            res.status(200).json(list);
            console.log(list);
        }
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
    console.log(req.body)
    let item = new court_booking(req.body);
    console.log(item)
    let start_time = item.start;
    let end_time = item.end;

    court_booking
        .findOne({court_area_id: item.court_area_id})
        .or([
            {end: {$gte: start_time, $lte: end_time}},
            {start: {$gte: start_time, $lte: end_time}},
        ])
        .then(booking => {
            console.log(booking)
            if (booking !== null) {
                res.status(200).send('Thời gian bạn chọn trùng với lịch của một khách khác');
            } else {
                item
                    .save()
                    .then(item => {
                        res.status(200).send('Đã thêm thành công');
                    })
                    .catch(() => {
                        res.status(500).send('Something wrong')
                    })
            }
        })
        .catch(() => {
            res.status(400).send('Something wrong')
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