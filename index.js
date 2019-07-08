require('./lib/dbconnect')
const { UserModel } = require('./models/user.model');
const { PostModel } = require('./models/post.model');
const { CommentModel } = require('./models/comment.model');
const { hash } = require('./lib/bcrypt');
const mongoose = require('mongoose');

// 4.13
PostModel.findById("5d1cbca406dc5c2f6a1a707d")
.populate({
    path: 'author',
    match: { email: 'admin@gmail.com' }
})
.populate({
    path: 'comments',
    options: { limit: 1 , sort: { content: 'asc' }}
})
.then(post=>console.log(post.comments[0].likes.length))
.catch(err=>console.log(err.message))

// 4.12
// 5d1cbca406dc5c2f6a1a707d: id post 5
// PostModel.findById('5d1cbca406dc5c2f6a1a707d')
// .populate('author', { _id: 0, name: 1 })
// .populate({
//     path: 'comments',
//     select: { _id: 0, author: 1, content: 1},
//     populate: { // populate for comment
//         path: 'author',
//         select: { _id: 0, name: 1 }
//     }
// })
// .then(post=>{
//     console.log('So luot like: '+ post.likes.length)
//     console.log('Tac gia: '+ post.author.name)
//     console.log('DS comments: ')
//     post.comments.forEach(comment => {
//         console.log('- Noi dung: '+ comment.content)
//         console.log('  Tac gia: '+ comment.author.name)
//     })
// })
// .catch(err=>console.log(err.message))


//4.10
// UserModel.findOne({email: 'manager@gmail.com'})
// .then(user=>{
//     if(!user) throw new Error('Cannot find user!')
//     return console.log(user.friends.length)
// })
// .catch(err=>console.log(err.message))


// 4.9
// UserModel.findOne({email: 'admin@gmail.com'})
// .populate({
//     path: 'posts',
//     // select: 'content comments'
//     select: { content: 1, _id: 0 }
// })
// .select('email')
// .then(user=>console.log(user))
// .catch(err=>console.log(err.message))



// 4.8
// UserModel.findOne({email: 'manager@gmail.com'})
// .then(userA=>{
//     if(!userA) throw new Error('Cannot find a!')
//     return UserModel.findOneAndUpdate({email:'guest@gmail.com'},{
//         $pull: { friends: userA._id}
//     })
// })
// .then(userB=>{
//     if(!userB) throw new Error('Cannot find user!')
//     return UserModel.findOneAndUpdate({email:'manager@gmail.com'},{
//         $pull: { friends: userB._id}
//     })
// })
// .then(userA=>console.log(userA))
// .catch(err=>console.log(err.message))

// 4.7
// UserModel.findOne({email: 'manager@gmail.com'})
// .then(sender=>{
//     if(!sender) throw new Error('Cannot find sender')
//     return UserModel.findOneAndUpdate({email: 'guest@gmail.com'},{
//         $pull: { receiveRequests: sender._id },
//         $addToSet: { friends: sender._id }
//     })
// })
// .then(receiver=>{
//     if(!receiver) throw new Error('Cannot find receiver')
//     return UserModel.findOneAndUpdate({email: 'manager@gmail.com'},{
//         $pull: { sendRequests: receiver._id },
//         $addToSet: { friends: receiver._id }
//     })
// })
// .then(receiver=>console.log(receiver))
// .catch(err=>console.log(err.message))

//4.6
// UserModel.findOne({email: 'guest@gmail.com'})
// .then(receiver=>{
//     if(!receiver) throw new Error('Cannot find receiver!')
//     return UserModel.findOneAndUpdate({email:'manager@gmail.com'},{
//         $addToSet: { sendRequests: receiver._id }
//     })
// })
// .then(sender=>{
//     if(!sender) throw new Error('Cannot find sender!')
//     return UserModel.findOneAndUpdate({email: 'guest@gmail.com'},{
//         $addToSet: { receiveRequests: sender._id}
//     }, { new: true })
// })
// .then(receiver=>console.log(receiver))
// .catch(err=>console.log(err.message))


// 4.5
// UserModel.findOne({email: 'manager@gmail.com'})
// .then(user=>PostModel.findByIdAndUpdate('5d1cbca406dc5c2f6a1a707d',{
//         $pull: { likes: user._id}
//     }, { new: true })
// )
// .then(post=>console.log(post))
// .catch(err=>console.log(err.message))

// 4.4
// UserModel.findOne({email: 'manager@gmail.com'})
// .then(user=>PostModel.findByIdAndUpdate('5d1cbca406dc5c2f6a1a707d',{
//     $addToSet: { likes: user._id }
// }, { new : true }))
// .then(post=>console.log(post))
// .catch(err=>console.log(err.message))



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