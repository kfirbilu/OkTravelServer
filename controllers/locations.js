const Location = require('../models/location_model')
const User=require('../models/user_model')
const Post=require('../models/post_model')

const getAllLocations = async (req,res)=>{
    try{
        locations = await Location.find()  
        console.log(locations) 
        res.status(200).send(locations)
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}

const getLikedLocations = async (req,res)=>{
    try{
        const query = {
            userName: req.body.userName
        }
        user = await User.findOne(query)
        if (user!=null){
            likedList = user.likedList
            if (likedList.lenght == 0){
                res.status(200).send(null)
            }
            const query_to_liked_location = {
                postId: likedList
            }
            likedLocations = await Location.find(query_to_liked_location)
            res.status(200).send(likedLocations)
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

const getMyPostsLocations = async (req,res)=>{
    try{
        const query = {userName : req.body.userName}
        posts = await Post.find(query)
        user = await User.findOne(query)
        if (user!=null){
            postID_list = []
            for (let i = 0; i < posts.length; i++) {
                postID_list[i] = posts[i].postID
            }
            const query_to_myposts_location = {
                postId: postID_list
            }
            mypostsLocations = await Location.find(query_to_myposts_location)
            res.status(200).send(mypostsLocations)
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


const locationSearch = async (req,res)=>{
    const query = {
        locationName: {$regex: req.body.postTitle}
    }
    if(req.body.postTitle == ""){
        res.status(200).send([])
    }else{
        const location = await Location.find(query)
        console.log(location)
        res.status(200).send(location)
    }
}


module.exports = {
    getAllLocations,
    getLikedLocations,
    getMyPostsLocations,
    locationSearch
}