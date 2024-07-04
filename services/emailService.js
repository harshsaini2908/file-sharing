// // import nodemailer from "nodemailer";
// // import dotenv from 'dotenv';

// // dotenv.config();


// // const sendMail = async(from , to ,subject,text,html) => {
// //     // let transporter = nodemailer.createTransport({
// //     //     host : process.env.SMTP_HOST,
// //     //     port: process.env.SMTP_PORT,
// //     //     secure: false,
// //     //     auth:{
// //     //         user: process.env.MAIL_USER,
// //     //         pass: process.env.MAIL_PASS
// //     //     }
// //     // });

// //     // // this is the method of nodemailer
// //     // let info =await transporter.sendMail({
// //     //     from: `inShare <${from}>`,
// //     //     to,
// //     //     subject,
// //     //     text,
// //     //     html
// //     // });
// //     // console.log(info);

// //     let transporter = nodemailer.createTransport({
// //         host: 'smtp-relay.brevo.com',
// //         port: 587,
// //         secure: false, // true for 465, false for other ports
// //         auth: {
// //             user: '77d7d6001@smtp-brevo.com', // generated ethereal user
// //             pass: 'yb1tsPHkYghSM0rO', // generated ethereal password
// //         },
// //     });

// //     // send mail with defined transport object
// // let info = await transporter.sendMail({
// //     from: `inShare <${from}>`, // sender address
// //     to: to, // list of receiver s
// //     subject: subject, // Subject line
// //     text: text, // plain text body
// //     html: html, // html body
// // });

// // }

// // export default sendMail;


// // import nodemailer from "nodemailer";
// // import dotenv from 'dotenv';

// // dotenv.config();

// // const sendMail = async (from, to, subject, text, html) => {
// //     console.log('Sending mail...');
// //     console.log('From:', from);
// //     console.log('To:', to);
// //     console.log('Subject:', subject);

// //     try {
// //         let transporter = nodemailer.createTransport({
// //             host: 'smtp-relay.brevo.com',
// //             port: 587,
// //             secure: false, // true for 465, false for other ports
// //             auth: {
// //                 user: '77d7d6001@smtp-brevo.com', // generated ethereal user
// //                 pass: 'yb1tsPHkYghSM0rO', // generated ethereal password
// //             },
// //         });

// //         let info = await transporter.sendMail({
// //             from: `inShare <${from}>`, // sender address
// //             to: to, // list of receivers
// //             subject: subject, // Subject line
// //             text: text, // plain text body
// //             html: html, // html body
// //         });

// //         console.log('Message sent: %s', info.messageId);
// //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// //     } catch (error) {
// //         console.error('Error sending email:', error);
// //         throw error;
// //     }
// // };

// // export default sendMail;


// import nodemailer from "nodemailer";
// import dotenv from 'dotenv';

// dotenv.config();

// const sendMail = async ({ from, to, subject, text, html }) => {
//     console.log('Sending mail...');
//     console.log('From:', from);
//     console.log('To:', to);
//     console.log('Subject:', subject);

//     try {
//         let transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             secure: false, // true for 465, false for other ports
//             auth: {
//                 user: process.env.MAIL_USER,
//                 pass: process.env.MAIL_PASS
//             }
//         });

//         let info = await transporter.sendMail({
//             from: `inShare <${from}>`, // sender address
//             to: to, // list of receivers
//             subject: subject, // Subject line
//             text: text, // plain text body
//             html: html, // html body
//         });
//         console.log(info);
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw error;
//     }
// };

// export default sendMail;

import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const sendMail = async ({ from, to, subject, text, html }) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        // logger: true,  // Enable logging
        // debug: true    // Enable debugging
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `inShare <${from}>`,
        to,
        subject,
        text,
        html,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return info;
};

export default sendMail;
