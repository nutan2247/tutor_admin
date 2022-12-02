const express = require("express")
const router = express.Router()
const Chat = require("../models/chat")
const ChatReply = require("../models/chatreply")
const checkToken = require('../users/usermiddleware/verify_token')
const upload = require('../models/chatImageFiles')
 


//Create chat 
router.post("/chat/add", checkToken, upload, async (req, res) => {
    if (req.file) {
        Image = req.file.path
    }
    try {
        const data = await new Chat({
            Image: req.file.path,
            student_name: req.body.student_name,
            student_id: req.body.student_id,
            contact_no: req.body.contact_no,
            no_of_chat: req.body.no_of_chat,
            new_chat: req.body.new_chat,
            status: req.body.status,
            action: req.body.action,
        })
        data.save()
        return res.status(200).json({ success: true, data: data })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

//Read Chat data
router.get('/chat/list', checkToken, async (req, res) => {
    try {
        const result = await Chat.find();
        return res.status(200).json({
            success: true,
            status: 200,
            msg: 'Chat List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});

//chat get by studentid
router.post('/chat/list/:student_id', checkToken, async (req, res) => {
    const student_id = req.params.student_id
    try {
        const result = await Chat.find({student_id});
        return res.status(200).json({
            success: true,
            status: 200,
            msg: 'Chat List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


//Chat Edit
router.patch('/chat/update/:_id', checkToken, upload, async (req, res, next) => {
    const _id = req.params._id;
    const Details = {
        Image: req.body.Image,
        student_name: req.body.student_name,
        student_id: req.body.student_id,
        contact_no: req.body.contact_no,
        no_of_chat: req.body.no_of_chat,
        new_chat: req.body.new_chat,
        status: req.body.status,
        action: req.body.action,
    }
    if (req.file) {
        Image = req.file.path
    }
    try {
        const data = await Chat.updateOne({ _id }, {
            $set: {
                Image: req.file.path,
                student_name: req.body.student_name,
                student_id: req.body.student_id,
                contact_no: req.body.contact_no,
                no_of_chat: req.body.no_of_chat,
                new_chat: req.body.new_chat,
                status: req.body.status,
                action: req.body.action,
            },
        })
        return res.send({ success: true, msg: "Update successfull", data: data });

    } catch (error) {
        return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
    }
})

//Delete Notice Board
router.delete('/chat/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Chat.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});

//message from User Side
router.post("/chat/user", checkToken, async (req, res) => {
    try {
        const user = await new ChatReply({
            student_id: req.body.student_id,
            reply_to: req.body.reply_to,
            message: req.body.message,
            updated_At: req.body.updated_At,
            reply_message: req.body.reply_message,
            user: req.body.user

        })
        user.save()
        return res.status(200).json({ success: true, data: user })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

//message from Admin Side
router.post("/chatting/admin", async (req, res) => {
    console.log('chatting');
    try {
        const admin = await new Chat({
            student_id  : req.body.student_id,
            reply_to    : req.body.reply_to,
            message     : req.body.message,
            reply_by    : req.body.reply_by,
            isAdmin     : true
        })
        admin.save();
        return res.status(200).json({ success: true, data: admin })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})


//Get chat by student_id
router.post('/chating/list', async (req, res) => {
    const student_id = req.body.student_id
    try {
        const result = await ChatReply.find({ student_id });
        return res.status(200).json({
            success: true,
            status: 200,
            msg: 'Chating List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


module.exports = router