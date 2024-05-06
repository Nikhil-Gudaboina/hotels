const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');

router.post('/',async (req,res)=>{

    try{
        const data = req.body //Assuming the request body contains the person data

    //Create a new Person document using the Mongoose model
    const newMenu = new menu(data);

    //Save the new person to the database
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

})

router.get('/',async (req,res)=>{
    try{
        const data = await menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:taste',async (req,res)=>{
    try{
        const taste = req.params.taste;
    if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
        const response = await menu.find({taste:taste});
        console.log('request fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error:'Invalid taste'});
    }
}catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await menu.findByIdAndUpdate(menuId,updatedMenuData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error:'Menu Item not found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id;

        const response = await menu.findByIdAndDelete(menuId);

        if(!response){
            return res.status(404).json({error:'Menu Item not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:'Menu Item Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


//comment added
module.exports=router;
