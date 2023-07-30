const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')
const { findByIdAndDelete } = require('../src/models/user')

// Task.findByIdAndDelete('64be860c64329294b32b4157').then((task) =>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((task2) => {
//     console.log(task2)
// }).catch((e) => {
//     console.log(e)
// })


const DeletetaskCount = async (id,completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

DeletetaskCount('64c0676dfb00b3939039858d',false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})