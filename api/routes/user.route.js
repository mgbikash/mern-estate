import express from 'express'
import { test } from '../controller/user.controller.js';

const router=express.Router();

// router.get('/testtwo',(req,res)=>{
//     res.json({message:"hello wor"})
// })
router.get('/testtwo',test)




export default router;