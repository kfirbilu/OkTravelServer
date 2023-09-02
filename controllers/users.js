const User=require('../models/user_model')
const Follower=require('../models/followers_model')

const addNewUser = (req,res)=>{
    const user = User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        likedList: req.body.likedList
    })

    user.save((error,newUser)=>{
        if (error){
            res.status(400).send({
                'status': 'failed',
                'error': error.message
            })
        }
        else{
            res.status(200).send({
                'status': 'ok',
                'user': newUser
            })
        }
    })
}

const editUser = async (req,res)=>{
    const query = {
        userName: req.body.oldUserName,
    }
    var newvalues = {$set: {userName: req.body.userName, phoneNumber: req.body.phoneNumber, imageUrl: req.body.imageUrl, likedList: req.body.likedList}}
    User.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })   
    res.status(200).send()
}


const getUserbyUsername = async (req,res)=>{
    const query = {
        userName: req.body.userName,
    }
    console.log(req.body)
    user = await User.findOne(query)
    if (user!=null){
        const objToSend = {
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            imageUrl: user.imageUrl,
            likedList: user.likedList
        }
        res.status(200).send(objToSend)
    }
    else{
        res.status(405).send()
    }      
}

const partialUserSearch = async (req,res)=>{
    const query = {
        userName: {$regex: req.body.userName}
    }
    if(req.body.userName== ""){
        res.status(200).send([])
    }
    else{
        const user = await User.find(query,{userName:1, imageUrl:1})
        res.status(200).send(user)
    }  
}

const addPostIdToLikedList = async (req,res)=>{
    const query = {
        userName: req.body.userName,
    }
    var postID = req.body.postID
    user = await User.findOne(query)
    var currnetLikedList = user.likedList
    currnetLikedList.push(postID)
    var newvalues = {$set: {likedList: currnetLikedList}}
    User.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })   
    res.status(200).send()  
}


const getLikedListByUserName = async (req,res)=>{
    try{
        const query = {
            userName: req.body.userName,
        }
        user = await User.findOne(query)
        if (user!=null){
            likedList = user.likedList
            console.log(likedList)
            res.status(200).send(likedList)
        }
        else{
            res.status(405).send()
        }      
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}

const removePostIDFromLikedList = async (req,res)=>{
    const query = {
        userName: req.body.userName,
    }
    var postID = req.body.postID
    user = await User.findOne(query)
    var currnetLikedList = user.likedList
    for(i=0; i< currnetLikedList.length; i++){
        if(currnetLikedList[i] == postID){
            currnetLikedList.splice(i, 1)
            break
        }
    }
    var newvalues = {$set: {likedList: currnetLikedList}}
    User.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })   
    res.status(200).send()  
}

const getFollowersByUserName = async(req,res)=>{
    try {
        const query = {
            to: {$regex: req.body.userName}
        }
        if(req.body.userName== ""){
            res.status(200).send([])
        }
        else{
            followers = await Follower.find(query)
            users_name =[]
            for(let i=0; i < followers.length; i++){
                users_name.push(followers[i].from)
            }
            const query_for_get_users = {
                userName: users_name
            }
            users = await User.find(query_for_get_users, {userName:1, imageUrl:1})
            res.status(200).send(users)
        }
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }  
}

const getFollowingByUserName = async(req,res)=>{
    try {
        const query = {
            from: {$regex: req.body.userName}
        }
        if(req.body.userName== ""){
            res.status(200).send([])
        }
        else{
            following = await Follower.find(query)
            users_name_following =[]
            for(let i=0; i < following.length; i++){
                users_name_following.push(following[i].to)
            }
            const query_for_get_users_following = {
                userName: users_name_following
            }
            users = await User.find(query_for_get_users_following, {userName:1, imageUrl:1})
            res.status(200).send(users)
        }
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }   
}

module.exports = {
    addNewUser,
    getUserbyUsername,
    editUser,
    addPostIdToLikedList,
    getLikedListByUserName,
    removePostIDFromLikedList,
    partialUserSearch,
    getFollowersByUserName,
    getFollowingByUserName
}