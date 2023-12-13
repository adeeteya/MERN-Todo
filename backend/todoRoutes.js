const express=require('express');

const router=express.Router();

const TodosModel=require("./models");

router.get("/", async(req, res) => {
    try {
        const todos =await TodosModel.find();
        res.json(todos);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get("/:id", async(req, res) => {
    try {
        const todo = await TodosModel.findById(req.params.id);
        res.json(todo);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const todo = await TodosModel.findByIdAndUpdate(req.params.id,req.body);
        res.send("Todo Updated Successfully");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const todo = await TodosModel.findByIdAndDelete(req.params.id);
        res.send("Todo Deleted Successfully");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post("/", async(req, res) => {
    try{
        const newTodo=new TodosModel({name:req.body.name,isCompleted:req.body.isCompleted});
        await newTodo.save();
        res.status(201).send("Todo Created Successfully");
    }catch(e){
        res.status(400).send(e.message);
    }
});


module.exports=router;