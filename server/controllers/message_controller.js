const message_model = require('../models/message_model')

exports.get_message = (req, res) => {
    message_model
        .find({}, (err, list)=>{
            if (err) {
                console.log(err)
            }
            else {
                res.json(list)
            }
        })
        .catch(()=>{
            res.status(400).send('Something wrong')
        })
}

exports.add_message = (item) => {
    console.log(item)
    let message_item = new message_model(item);
    message_item
        .save()
        .then((item)=>{
            return {result: 'Lưu thành công'}
        })
        .catch(()=>{
            return {result: 'Lưu thất bại'};
        })
}


exports.delete = (req, res) => {
    let objDel = {
        _id: {
            $in: req.body
        }
    }
    message_model
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