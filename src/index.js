const app = require('./app')
const port = process.env.PORT

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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

