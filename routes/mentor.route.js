const express=require('express')
const router=express.Router();
const { validate, MENTORBACK} = require("../models/mentor.model");

router.post("/",async(req,res)=>{
    try{
        const payload = req.body;

        const newmen = new MENTORBACK(payload);

        await newmen.save((err, data)=> {
            if(err){
                return res.status(400).send({message: 'Error while adding new details. Please check the data'});
            }

            res.status(201).send({menid: data._id, message: "details has been added successfully." })
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});

router.get("/allmentor",async(req,res)=>{
    try{
MENTORBACK.find((err,data)=>{
    if(err){
        res.status(400).send({message:"error while retriving"})
    }
    res.status(200).send(data);
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }

})
router.put('/assignstudents/:menID', (req, res) => {
    try{
       MENTORBACK.findByIdAndUpdate({_id: req.params.menID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an existing details. Please check the data'})
            }

            res.status(201).send({menid:data._id, message: "details have been updated."})
        })

    }catch(error){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
});


router.delete("/delete/:menID",async(req,res)=>{
    try{
MENTORBACK.deleteOne({_id:req.params.menID},(err,data)=>{
    if(err){
        res.status(400).send({message:"error while deleting data"})
    }
    res.status(200).send({message:`deleted id ${req.params.menID} successfully`})
})
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });  
    }
})

router.get('/:menID', (req, res) => {
    try{
       MENTORBACK.findOne({_id: req.params.menID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving an details. Please check the data'})
            }

            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});


module.exports=router;