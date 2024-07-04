import { error } from "console";
import express from "express";
import multer from "multer";
import path from "path";
import File from "../models/file.js";
import {v4 as uuid4} from "uuid";
import sendMail from '../services/emailService.js';
import emailTemplate from '../services/emailTemplate.js';

const router=express.Router();

let storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req,file,cb) =>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
})

let upload = multer({
    storage,
    limits:{fileSize: 1000000*100},
}).single('myfile');

router.post('/',(req,res) =>{
    

    // store file


    upload(req,res,async(err)=>{

//         // validate Request
                if (err) {
                            return res.status(500).send({ error: err.message });
                }
        if(!req.file){
            return res.json({error:"All fields are required!"});
        }

//        
//          // Store into Database

         const file = new File({
                filename:req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size:req.file.size
         }); 

         const response = await file.save();
         return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
//          // http://localhost:3000/files/233463hjsdgfg-234bhjbhbjhb


    });

   

//     // Response -> Link
});







// router.post('/send', async (req, res) => {
//   const { uuid, emailTo, emailFrom, expiresIn } = req.body;
//   if(!uuid || !emailTo || !emailFrom) {
//       return res.status(422).send({ error: 'All fields are required except expiry.'});
//   }
//   // Get data from db 
//   try {
//     const file = await File.findOne({ uuid: uuid });
//     if(file.sender) {
//       return res.status(422).send({ error: 'Email already sent once.'});
//     }
//     file.sender = emailFrom;
//     file.receiver = emailTo;
//     const response = await file.save();
//     // send mail
//     const sendMail = require('../services/mailService');
//     sendMail({
//       from: emailFrom,
//       to: emailTo,
//       subject: 'inShare file sharing',
//       text: `${emailFrom} shared a file with you.`,
//       html: require('../services/emailTemplate')({
//                 emailFrom, 
//                 downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
//                 size: parseInt(file.size/1000) + ' KB',
//                 expires: '24 hours'
//             })
//     }).then(() => {
//       return res.json({success: true});
//     }).catch(err => {
//       return res.status(500).json({error: 'Error in email sending.'});
//     });
// } catch(err) {
//   return res.status(500).send({ error: 'Something went wrong.'});
// }

// });


router.post('/send', async (req, res) => {
  const { uuid, emailTo, emailFrom, expiresIn } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: 'All fields are required except expiry.' });
  }

  try {
    // Get data from db 
    const file = await File.findOne({ uuid: uuid });
    if (!file) {
      return res.status(404).send({ error: 'File not found.' });
    }

    // if (file.sender) {
    //   return res.status(422).send({ error: 'Email already sent once.' });
    // }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    // Send mail
    await sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'inShare file sharing',
      text: `${emailFrom} shared a file with you.`,
      html: emailTemplate({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email`,
        size: parseInt(file.size / 1000) + ' KB',
        expires: '24 hours'
      })
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('Error occurred:', err); // Log the error
    return res.status(500).send({ error: 'Something went wrong.' });
  }
});


export default router;

