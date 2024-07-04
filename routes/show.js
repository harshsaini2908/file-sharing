import express from "express";

import File from "../models/file.js";

const router=express.Router();

//  colon means that it is a dynamic parameter which changes for different file
router.get('/:uuid',async(req,res) => {
    // we will fetch data using uuid from database
    try{
        // we have used method findOne because we have to fetch one row from our database
        const file=await File.findOne({uuid: req.params.uuid});
        // when we use await we have to do error handling for this we can use try catch
        if(!file){
            return res.render('download',{error: 'Link has been expired.'}); 
        }

        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            fileSize: file.size,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            // http://localhost:3000/files/download/uuid
        });

    }catch(err){
        return res.render('download',{error: 'Something went wrong.'}); // in second parameter we can send data to our frontend
    }
});

export default router;