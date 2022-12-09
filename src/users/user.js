require('dotenv').config(); //get env variables

const express = require('express');
const _ = require('lodash')
const otpGenerator = require('otp-generator')
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const Student = require('../admin/models/student')
const Student = require("../admin/models/student")
//const OtpGenerate = require('../models/otpgenerate')
const OtpVerify = require('../admin/models/otpsave')
const Subject = require('../admin/models/subject')
const checktoken = require('../users/usermiddleware/verify_token')
const Class = require('../admin/models/class')
const upload = require('../models/uploadimage')
// const watchlatest = require('../models/watchlatest')
const Notification = require("../models/Notifications")
const checkBox = require("../admin/models/SubjectCheckbox")
//const Setting = require('../models/contact_us');
const ContactUs = require("../admin/models/contactus")
const Chapter = require('../admin/models/chapter');
const questionSet = require('../admin/models/questionSetPaper');
const question = require('../admin/models/question');
const Banner = require("../admin/models/banner")
const Notice = require("../admin/models/noticeBoard")
const PaymentLog = require("../admin/models/paymentLog")
const Topic = require("../admin/models/topic")

const quiz = require("../models/quizresult")
const resultlog = require("../models/resultlog");
const quizresult = require('../models/quizresult');
const postQuizdata = require("../models/postquizdata")
//const subject = require('../admin/models/subject');




//const admission = require("../models/chapter")
//const Question = require('../admin/models/questionSetPaper')
// const QuestionList = require('../models/question');
// const questionsetques = require('../models/questionStudent')
//const { ideahub } = require('googleapis/build/src/apis/ideahub');


//function for postquizdata
// async function quizdata(){
// const count_correct_answer = 0;
// const count_incorrect_answer = 0;
// const total_question = 0;
// quizScore.forEach(element => {
//     const score = element.options.find(selected == 'show')
//     if(!score){
//         return
//     }else{
//         if(score?.correct == 'true'){
//             count_correct_answer++
//         }else{
//             count_incorrect_answer++
//         }
//     }
//   });
// }




router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'User does not exits!'
                });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(
            user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Mail Exists!"
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId,
                                email: req.body.email,
                                password: hash
                            })
                            user
                                .save()
                                .then(result => {
                                    console.log(result);
                                    res.status(200).json({
                                        message: 'User created'
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    });
                                })
                        }

                    });
                }
            }
        )

});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "user deleted!"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


router.get('/getData', (req, res) => {
    res.status(200).json({
        message: 'Express API is working @ port:3000'
    });
});

router.get('/userList', (req, res, next) => {
    User.find()
        .select('email password _id')
        .exec()
        .then(result => {
            const response = {
                count: result.length,
                users: result.map(result => {
                    return {
                        email: result.email,
                        password: result.passwor,
                        _id: result._id
                    }
                }
                )
            }
            // console.log(docs);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

});


//LOGIN
router.post('/signin', async (req, res) => {
    const mobile_number = req.body.mobile_number
    try {
        const data = await Student.findOne({ mobile_number: mobile_number })
        if (!data) { return res.status(500).json({ success: false, message: 'Please Enter a Valid Contact No' }) }
        res.status(200).json({ success: true, data })
        //console.log(data)

    } catch (error) {
        return res.status(500).json({ success: false, error: "Please Enter a Valid Mobile_no" })
    }

})


//OTP GENERATE
router.post('/login_by_otp', async (req, res) => {
    const mobile_number = req.body.mobile_number
    try {
        const Data = await Student.findOne({ mobile_number })
        if (!Data) { res.status(400).json({ success: false, message: 'Please Enter a Valid Contact No' }) }

        const AutoOTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        })
        const otp = new OtpVerify({ mobile_number: mobile_number, otp: AutoOTP })
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt)

        const result = otp.save(function (err) {
        })
        res.status(200).json({ success: true, message: "OTP SEND SUCCESSFULLY " + AutoOTP })
        console.log(AutoOTP)



    } catch (error) {
        // res.status(500).json({success:false, error})
    }

})



//VERIFY OTP
router.post('/verify_otp', async (req, res) => {
    const mobile_number = req.body.mobile_number
    const otpHolder = await OtpVerify.find({
        mobile_number: req.body.mobile_number
        // otp : req.body.otp

    })
    //console.log(otpHolder)
    if (otpHolder != null && otpHolder.length === 0) return res.status(400).json({ success: false, message: 'EXPIRED OTP' })
    const rightthreeFind = otpHolder[otpHolder.length - 1]
    //console.log(rightthreeFind)
    const validUser = bcrypt.compareSync(req.body.otp, rightthreeFind.otp)
    if (rightthreeFind.mobile_number === req.body.mobile_number && validUser) {
        const Data1 = new Student(_.pick(req.body, ["mobile_number"]))
        const user = await Student.findOne({ mobile_number })
        console.log(user)

        const payload = {
            user: {
                _id: user._id,
                mobile_number: user.mobile_number,
                admin_id: user.admin_id
            },
            //console.log(payload)
        };

        //   console.log(payload);
        jwt.sign({ payload }, process.env.JWT_KEY, { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    token: token,
                });
            }
        );

    } else {
        return res.status(401).send({
            success: false,
            message: "Your otp was wrong",
        })
    }
})


//CLASS AND SUBJECT API IN ONE ROUTE
router.get('/subject_class', checktoken, async (req, res) => {
    try {

        const subzect = await Subject.find()
        const sub = await Class.find()
        const result = { "subject": subzect, "class": sub }
        res.status(200).json({ success: true, result })


    } catch (error) {
        res.status(500).json({ succes: false, message: error.message })
    }
})


//Update personal details
router.post('/student_update', checktoken, upload, async (req, res) => {

    const id = req.body._id;

    const Details = {
        name: req.body.name,
        email: req.body.email,
        father_name: req.body.father_name,
        roll_no: req.body.roll_no,
        date_of_admission: req.body.date_of_admission,
        // contact_no : req.body.contact_no,
        student_photo: req.body.student_photo,
    }
    if (req.file) {
        Details.student_photo = req.file.path
    }
    // Data123 = await student.findById({_id:id});
    // console.log(Data123)
    try {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({ error: 'Please Filled The Data' })
        }
        const Data = await Student.updateOne({ _id: id }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                father_name: req.body.father_name,
                roll_no: req.body.roll_no,
                date_of_admission: req.body.date_of_admission,
                student_photo: req.file.path,
            },
        })

        console.log(Details)
        return res.status(200).json({ success: true, Data })
    } catch (error) {
        return res.status(500).json({ success: false, error })

    }

})


//Student Data Get By ObjectId
router.post('/student_objectid', checktoken, async (req, res) => {
    const _id = req.body._id
    //const contact_no = req.body.contact_no
    try {
        const stu = await Student.find({ _id }).select("-student_password")
        res.status(200).json({ success: true, stu })
    } catch (err) {
        res.status(401).json({ success: false, message: 'Please enter a valid ID' })
    }
})



//Subject api
router.get('/student_subject', checktoken, async (req, res) => {
    try {

        const subj = await Subject.find()
        res.status(200).json({ success: true, subj })


    } catch (error) {
        res.status(500).json({ succes: false, message: error.message })
    }
})


// Notifications api
router.get("/notification", checktoken, async (req, res) => {
    try {
        const Notify = await Notification.find()
        res.status(200).json({ success: true, Notify })
    } catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
})


//subject checkbox api
router.post("/subject_checkbox", checktoken, async (req, res) => {
    try {
        const check = new checkBox(req.body)
        const result = await check.save()
        res.status(200).json({ success: true, result })
    } catch (err) {
        res.status(401).json({ success: false, message: err.message })
    }
})


//contact us api
router.get("/contact_us", checktoken, async (req, res) => {
    try {
        const sett = await ContactUs.find()
        return res.status(200).json({ success: true, sett })
    } catch (err) {
        return res.status(401).json({ success: false, message: err.message })
    }
})


//chapter get api
router.post("/chapter", checktoken, async (req, res) => {
    const admin_id = req.body.admin_id
    try {
        const Data = await Chapter.find({ admin_id })
        return res.status(200).json({ success: true, Data })
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})


//Connect Two Collections
router.post("/quiz", checktoken, async (req, res) => {
    const class_id = req.body.class_id
    try {
        const quiz = await questionSet.aggregate([{ $match: { admin_id } },
        {
            $lookup:
            {
                from: "classes",
                localField: "admin_id",
                foreignField: "admin_id",
                as: "result"
            }
        },
        ])
        return res.status(200).json({ success: true, quiz })
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
})


//All Quiz Questions Get
router.get("/quiz/question", checktoken, async (req, res) => {
    try {
        const List = await question.find()
        return res.status(200).json({ success: true, List })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})


//Question Get by Admin id and Subject
router.post("/quiz/question/list", checktoken, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.body._id)
    try {
        const ques = await questionSet.aggregate([{ $match: { _id: id } },
        {
            $lookup:
            {
                from: "quizzes",
                localField: "_id",
                foreignField: "set",
                as: "result"
            }
        }, { $project: { "chapter_name": 0, "qps_title": 0, "qps_time": 0, "qps_mark": 0, "no_of_ques": 0, "qps_language": 0, "ques_ids": 0, "qps_date": 0, "solution_pdf": 0, "__v": 0, "qp_status": 0 } }
        ])
        return res.status(200).json({ success: true, result: ques[0] }),
            console.log(ques)
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
})




//QuetionSet call by adminid and subject
router.post('/subject/question', async (req, res) => {
    const admin_id = req.body.admin_id
    const subject = req.body.subject
    try {
        const Data = await questionSet.find({ admin_id, subject })
        return res.status(200).json({ success: true, Data })
    } catch (err) {
        return res.status(401).json({ success: false, message: err.message })
    }
})


//class call by admin_id
router.post('/student/class', checktoken, async (req, res) => {
    const admin_id = req.body.admin_id
    try {

        const clas = await Class.find({ admin_id })
        res.status(200).json({ success: true, clas })


    } catch (error) {
        res.status(500).json({ succes: false, message: error.message })
    }
})


router.post('/student/subject', checktoken, async (req, res) => {
    const class_id = req.body.class_id
    try {
        let subjec = "no data found";
        let status = false;
        let msg = "empty";
        if (!class_id) {
            subjec = await Subject.find()
            status = true;
            msg = "All class subject";
        } else {
            subjec = await Subject.find({ class_id })
            status = true;
            msg = "one class subject";
        }
        return res.status(200).json({ success: status, msg: msg, subjec })

    } catch (error) {
        res.status(500).json({ succes: false, message: error.message })
    }
})

//Banner Api
router.get("/banner", async (req, res) => {
    try {
        const banner = await Banner.find({ banner_status: "active" })
        return res.status(200).json({ success: true, data: banner })
    } catch (err) {
        return res.status(400).json({ success: false, msg: err.message })
    }
})

//News Api
router.get("/news", async (req, res) => {
    try {
        const news = await Notice.find({ status: "active" })
        return res.status(200).json({ success: true, data: news })
    } catch (err) {
        return res.status(400).json({ success: false, msg: err.message })
    }
})

//Payment History Api
router.post("/payment/history", async (req, res) => {
    const payment_id = req.body.payment_id
    try {
        const payment = await PaymentLog.find({ payment_id })
        return res.status(200).json({ success: true, data: payment })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

// //quiz result Api
router.post("/quizresult", async (req, res) => {
    const ques_no = req.body.ques_no
    try {
        const result = await resultlog.find({ ques_no })
        return res.status(200).json({ success: true, data: result })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

async function addresult(data) {
    const count_correct = 0;
    var count_incorrect = 0;
    var attempt = 0;

    if (data.correct_ans == data.answer) {
        count_correct = 1;
    }
    if (data.correct_ans != data.answer) {
        count_incorrect = 1;
    }
    attempt = count_correct + count_incorrect;

    const neres = new quizresult({
        student_id: data.student_id,
        qset: data.qset,
        class: data.admin_id,
        subject: data.subject,
        total_question: attempt,
        wrong: count_incorrect,
        correct: count_correct
    })
    const qr = neres.save();
    //console.log(qr)
    return qr;
}

async function updateresult(data, storedRes) {
    var count_correct = storedRes.correct;
    var count_incorrect = storedRes.wrong;
    var attempt = storedRes.attempt;

    if (data.correct_ans == data.answer) {
        count_correct = 1 + count_correct;
    }
    if (data.correct_ans != data.answer) {
        count_incorrect = 1 + count_incorrect;
    }
    attempt = count_correct + count_incorrect;

    const check1 = await quizresult.updateOne({ qset: data.qset }, {
        $set: {
            student_id: data.student_id,
            qset: data.qset,
            class: data.admin_id,
            subject: data.subject,
            total_question: attempt,
            wrong: count_incorrect,
            correct: count_correct
        }
    })
    //console.log(check1)  
    return check1;
}

async function addlog(data, resid) {
    const log = new resultlog({
        result_id: data.result_id,
        student_id: data.student_id,
        admin_id: data.admin_id,
        subject: data.subject,
        ques_no: data.ques_no,
        answer: data.answer,
        correct_ans: data.correct_ans,
    })
    const lr = await log.save();
    //console.log(lr)
    return lr;
}
//Create quiz log
router.post("/quizlog/add", async (req, res) => {

    try {
        const check = await quizresult.findOne({ qset: req.body.qset })
        //console.log(check)
        var quizres = '';
        if (check) {
            const ur = updateresult(req.body, check)
            //console.log(ur)
            if (ur) {
                //console.log(ur)

                addlog(req.body, check._id);
                quizres = 'data updated';
            }
        } else {
            const isresult = addresult(req.body);
            //console.log(isresult)
            if (isresult) {
                addlog(req.body, isresult._id);
                quizres = 'data added';
            }
        }
        return res.status(200).json({ success: true, msg: quizres })
    } catch (err) {
        res.status(401).json({ success: false, msg: err.message })
    }
})



//quiz log Api
router.post("/quizlog", async (req, res) => {
    const { student_id, admin_id, subject } = req.body

    try {
        const result = await resultlog.find({ student_id, admin_id, subject })
        return res.status(200).json({ success: true, data: result })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

function gradeSystem(scoreP) {
    var grade = '';
    if (scoreP < 35) {
        grade = 'Fail';
    } else if (scoreP >= 35 && scoreP < 50) {
        grade = 'Good';
    } else if (scoreP >= 50 && scoreP < 70) {
        grade = 'Better';
    } else if (scoreP >= 70 && scoreP < 90) {
        grade = 'Best';
    } else if (scoreP >= 90 && scoreP < 100) {
        grade = 'Excellent';
    } else {
        grade = '';
    }
    return grade;
}

//quiz score Api
router.get("/quiz/score/:_id", async (req, res) => {
    const correct_answer = 0;
    var msg = "";
    const id = req.params
    try {
        const result = await quiz.find({ student_id: id });
        const totalscore = []
        for (const [_, value] of Object.entries(result)) {
            const pers = (parseInt(value.correct) * 100)/parseInt(value.total_question);
            var grade = gradeSystem(pers); 
            console.log(grade,pers);
            const Score = {
                student_id: value.student_id,
                qset: value.qset,
                class: value.class,
                subject: value.subject,
                duration: value.duration,
                correct: value.correct,
                wrong: value.wrong,
                total_question: value.total_question,
                grade : grade 
            }
            totalscore.push(Score)
        }
        // const totalS = gradeSystem(55)
        // console.log(totalS)
        /** co = 55; co = gradeSystem(55) */
        return res.status(200).json({ success: true, data: totalscore })
    } catch (err) {
        return res.status(400).json({ success: false, msg: err.message })
    }
})


//post quiz data Api
router.post('/quiz/data', async (req, res) => {
    try {
        const data = new postQuizdata({
            correct_answer: req.body.correct_answer,
            wrong_answer: req.body.wrong_answer,
            question: req.body.question,
            duration: req.body.duration
        })
        const finaldata = await data.save()
        return res.status(200).json({ success: true, msg: 'your data submit successfully' })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})


router.post("/topic", checktoken, async (req, res) => {
    const class_id = req.body.class
    try {
        const data = await Topic.find({ class: class_id })
        //const jp = JSON.parse(JSON.stringify(data))
        //console.log(jp)
        return res.status(200).json({ success: true, data: data })
    } catch (err) {
        return res.status(401).json({ success: false, err: err.message })
    }
})


//questionSet List Api
router.post("/questionset/list",checktoken,async(req,res)=>{
    const { class_id, subject_id} = req.body
    try{
        const questionet = await questionSet.find({class_id, subject_id},{ "status":"active"})
        return res.status(200).json({success:true, data:questionet})
    }catch(err){
        return res.send(401).json({success:false, msg:err.message})
    }
})


module.exports = router


