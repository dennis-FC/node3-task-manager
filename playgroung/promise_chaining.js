require('../src/db/mongoose')
const User = require('../src/models/user')


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
//64bc999bcfe3a316ae0b9a88
const updateAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateAndCount('64bc999bcfe3a316ae0b9a88',2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})