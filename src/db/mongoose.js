const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error('Email is invalid') 
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minLength:6,
        validate(value){
            if(value.toLowercase().includes("password")){
                throw new Error('password must not contain password')
            }
        }
    }
})

// const me = new User({
//     name:'    Benson    ',
//     email:'MAIEAMES@MEAD.io',
//     password: '123456'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error',error)
// })

const Tasks = mongoose.model('tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default: false
    }
})

const first_task = new Tasks({
    description: 'clean my desk',
    completed: true
})

first_task.save().then(() => {
    console.log(first_task)
}).catch((error) => {
    console.log(error)
})