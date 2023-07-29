const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }

})

router.get('/users', async (req,res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }

})

router.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    if(_id.length !==24){
        return res.status(400).send("User ID must be 24 characters long.")
    }

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(3)
    }

})

router.patch('/users/:id', async (req,res) => { //update
    const _id = req.params.id
    if(_id.length !==24){
        return res.status(400).send("User ID must be 24 characters long.")
    }
    const updates = Object.keys(req.body)
    const allowUpdates = ['name','email','password','age']
    const isvalidOperation = updates.every((update) => {
        return allowUpdates.includes(update)
    })

    if(!isvalidOperation){
        return res.status(400).send({error:'invalid updates'})
    }
    
    try{
        const user  = await User.findByIdAndUpdate(_id,req.body,{new:true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req,res) => {
    const _id = req.params.id
    if(_id.length !==24){
        return res.send('id must be 24 characters')
    }

    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send('error: user not found')
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
    
})

module.exports = router