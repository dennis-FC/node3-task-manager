require('../src/db/mongoose')
const User = require('../src/models/user')

//64be86632885e395e058313c

// User.findByIdAndUpdate('64be958f22fd64fa4a52d98f',{
//     age:1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgenCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAgenCount('64be958f22fd64fa4a52d98f',5).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})