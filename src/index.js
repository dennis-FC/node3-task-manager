const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next) => {
//     if(req.method === 'GET'){
//         res.send('GET request are disable')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next) => {
//     if(req.method){
//         res.status(503).send('maintance')
//     }else{
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async() => {
    // const task = await Task.findById('64cdfc61d8220406b42e2573')
    // await task.populate('owner')
    // console.log(task.owner)

    // const user = await User.findById('64cdfbb1d8220406b42e256d')
    // await user.populate('tasks')
    // console.log(user.tasks)
}

main()