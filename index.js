require('./lib/dbconnect')
const { UserModel } = require('./models/user.model');
const { PostModel } = require('./models/post.model');
const { CommentModel } = require('./models/comment.model');
const { hash } = require('./lib/bcrypt');
const mongoose = require('mongoose');

// 4.4
UserModel.findOne({email: 'manager@gmail.com'})
.then(user=>PostModel.findByIdAndUpdate('5d1cbca406dc5c2f6a1a707d',{
    $addToSet: { likes: user._id }
}, { new : true }))
.then(post=>console.log(post))
.catch(err=>console.log(err.message))



//4.3
// post id: 5d1cbca406dc5c2f6a1a707d // post 5
// user id: 5d1cb8c16b54162e91ae7e7c // user 1

// PostModel.findById('5d1cbca406dc5c2f6a1a707d')
// .then(async (post)=>{
//     const comment = await CommentModel.create({
//         author: '5d1cb8c16b54162e91ae7e7c',
//         post: post._id,
//         content: 'user 1 comment on post 5 (user 1)'
//     })
//     return { post, comment }
// })
// .then(obj =>{
//     return PostModel.findByIdAndUpdate(obj.post._id, {
//         $addToSet : { comments: obj.comment._id },
//     }, { new: true })
// })
// .then(post => console.log(post))
// .catch(err=>console.log(err.message))


// async function test(){

//     const session = await CommentModel.startSession();
//     session.startTransaction();
   
//     const comment = await new CommentModel({
//         author: '5d1f4f582b5f832a01af51e7',
//         post: '5d1cbca406dc5c2f6a1a707d',
//         content: 'user 2 comment on post 5 (user 1)'
//     }).save({session})
//     const post = await PostModel.findByIdAndUpdate('5d1cbca406dc5c2f6a1a707d',{
//         $addToSet : { comments: comment._id },
//     }, { new: true, session })
//     if(!post) {
//         await session.abortTransaction();
//         session.endSession();
//         console.log("rollback");
//     }
//     else {
//         await session.commitTransaction();
//         session.endSession();
//         console.log({ post })
//     }
// }
// test()



// 4.2
// 5d1cb8c16b54162e91ae7e7c : id admin
// PostModel.create({
//     author: '5d1cb8c16b54162e91ae7e7c',
//     content: 'Admin tao bai post thu 5'
// })
// .then(post=>{

//     return UserModel.findOneAndUpdate(
//         { _id: '5d1cb8c16b54162e91ae7e7c' },
//         { $addToSet: // $push
//             { posts: post._id }
//         },
//         { new: true}
//     )
// })
// .then(user => console.log(user))
// .catch(err=>console.log(err.message))


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

// populate()