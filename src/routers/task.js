const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req,res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

router.get('/tasks', async (req,res) => {
    
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
   
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    if(_id.length !==24){
        return res.status(400).send("Task ID must be 24 characters long.")
    }

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

router.patch('/tasks/:id',async (req,res) => {
    const _id = req.params.id
    if(_id.length !== 24){
        return res.status(400).send("User ID must be 24 characters long.")
    }

    const updates = Object.keys(req.body)
    const allowUpdates = ['description','completed']
    const isvalidOperation = updates.every((update) => {
        return allowUpdates.includes(update)
    }) 

    if(!isvalidOperation){
        return res.send('error: unvalid update')
    }

    try{
        const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    if(_id.length!==24){
        return res.send('error: Task ID must be 24 characters long.')
    }

    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send('error:id not found')
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router