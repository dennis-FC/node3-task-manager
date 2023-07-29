const mongoose = require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('64be860c64329294b32b4157').then((task) =>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((task2) => {
//     console.log(task2)
// }).catch((e) => {
//     console.log(e)
// })

const deleteAndCount = async (id,completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteAndCount('64bc911c55480e104809d8b9',false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
