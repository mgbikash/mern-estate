import express from 'express'

const router=express.Router();

router.get('/testtwo',(req,res)=>{
    res.json({message:"hello wor"})
})





export default router;