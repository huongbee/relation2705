require('./lib/dbconnect')
const { UserModel } = require('./models/user.model');
const { PostModel } = require('./models/post.model');
const { hash } = require('./lib/bcrypt');

// 4.2
// 5d1cb8c16b54162e91ae7e7c : id admin
PostModel.create({
    author: '5d1cb8c16b54162e91ae7e7c',
    content: 'Admin tao bai post thu 5'
})
.then(post=>{

    return UserModel.findOneAndUpdate(
        { _id: '5d1cb8c16b54162e91ae7e7c' },
        { $addToSet: // $push
            { posts: post._id }
        },
        { new: true}
    )
})
.then(user => console.log(user))
.catch(err=>console.log(err.message))


// 4.1
// hash('111111')
// .then(hash=> UserModel.insertMany([
//         {
//             email: 'admin@gmail.com',
//             password: hash,
//             name: 'Nguyen Van Admin'
//         },
//         {
//             email: 'manager@gmail.com',
//             password: hash,
//             name: 'Nguyen Van Manager'
//         },
//         {
//             email: 'guest@gmail.com',
//             password: hash,
//             name: 'Nguyen Van Guest' 
//         }
//     ])
// )
// .then(users => console.log(users))
// .catch(err=>console.log(err.message))