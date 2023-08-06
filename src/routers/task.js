const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.status(200).send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
   
})

router.get('/tasks/:id',auth, async (req,res) => {
    const _id = req.params.id
    
    try{
        const task = await Task.findOne({_id,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }

})

router.patch('/tasks/:id',auth,async (req,res) => {
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
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send('error:id not found')
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router