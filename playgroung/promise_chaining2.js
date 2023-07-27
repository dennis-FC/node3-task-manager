const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('64be860c64329294b32b4157').then((task) =>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((task2) => {
    console.log(task2)
}).catch((e) => {
    console.log(e)
})
