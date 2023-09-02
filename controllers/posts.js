const Post=require('../models/post_model')
const Location=require('../models/location_model')
const User=require('../models/user_model')

const getPostsbyUsername = async (req,res)=>{
    
    try{
        const query = {userName : req.body.userName}
        posts = await Post.find(query)  
        console.log(posts) 
        res.status(200).send(posts)
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}
const partialPostSearch = async (req,res)=>{
    const query = {
        postTitle: {$regex: req.body.postTitle}
    }
    if(req.body.postTitle == ""){
        res.status(200).send([])
    }else{
        const post = await Post.find(query)
        res.status(200).send(post)
    }
}

const getPostById = async (req,res)=>{
    try{
        post = await Post.findById(req.body.post_id)   
        res.status(200).send(post)
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}

const editPost = async (req,res)=>{
    const query = {
        postID: req.body.postID,
    }
    var newvalues = {$set: {postTitle: req.body.postTitle, postDescription: req.body.postDescription, categoriesList: req.body.categoriesList,
        updateDate: req.body.updateDate, longitude: req.body.longitude, latitude: req.body.latitude, videoUrl: req.body.videoUrl, likes: req.body.likes}}
    Post.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })   
    var newvalues_location = {$set: {longitude: req.body.longitude, latitude:req.body.latitude, locationName: req.body.postDescription}}
    Location.updateOne(query, newvalues_location, function(err, res){
        if (err) throw err
    })   
    res.status(200).send()
}

const deletePost = async (req,res)=>{
    const query = {
        postID: req.body.postid,
    }
    var newvalues = {$set: {isDeleted: true}}
    Post.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })
    Location.updateOne(query, newvalues, function(err, res){
        if (err) throw err
    })   
    res.status(200).send()
}

const addNewPost = (req,res)=>{
    console.log('addnewPost' + req.body.message)
    
    const post = Post({
        postTitle: req.body.postTitle,
        postDescription: req.body.postDescription,
        likes: req.body.likes,
        userName: req.body.userName,
        categoriesList: req.body.categoriesList,
        videoUrl: req.body.videoUrl,
        isDeleted: req.body.isDeleted,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        updateDate: req.body.updateDate
    })

    post.save((error,newPost)=>{
        if (error){
            console.log(error.message)
            res.status(400).send({
                'status': 'failed',
                'error': error.message
            })
        }
        else{
            var query = {_id : newPost._id}
            var newvalues = {$set: {postID: newPost._id, updateDate: new Date().getTime()}}
            Post.updateOne(query,newvalues, function(err,res){
                if (err) throw err;
                console.log("updated")
            })
            const location = Location({
                postId: newPost._id,
                locationName: newPost.postTitle,
                longitude: newPost.longitude,
                latitude: newPost.latitude,
                isDeleted: false
            })
            location.save((error,newLocation)=>{
                if(error){
                    res.status(400).send({
                        'status': 'failed',
                        'error': error.message
                    })
                }
            })
            console.log(newPost._id)
            res.status(200).send({
                'status': 'ok',
                'post': newPost
            })
        }
    })
}

const getLikedPostsbyUserName = async (req,res)=>{
    try{
        const query = {userName : req.body.userName}
        user = await User.findOne(query)
        postIDList = user.likedList
        const query_for_get_posts = {postID: postIDList}
        likedposts = await Post.find(query_for_get_posts)

        console.log(likedposts.reverse()) 
        res.status(200).send(likedposts.reverse())
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}


const getAllPostsBySortAlgorithm = async (req,res)=>{}


const getPosts = async (req,res)=>{
    const lastUpdateDate = req.body.updateDate
    const userName = req.body.userName
    console.log(lastUpdateDate)
    try{
        const query = {userName : req.body.userName}
        user = await User.findOne(query)
        if (user == null){
            const lastUpdateDate = req.body.updateDate
            const query = {updateDate :{$eq: lastUpdateDate, $gt: lastUpdateDate}}
            posts = await Post.find()  
            console.log(posts) 
            res.status(200).send(posts.reverse())
        }
        // by algorithem
        else {
            postIDList = user.likedList
            const query_for_get_posts = {postID: postIDList}
            likedposts = await Post.find(query_for_get_posts)
            sortedCategoriesList = sortCategoriesOfUserName(likedposts)
            posts = await Post.find()
            post_grades_dict = {}

            for (let i = 0; i < posts.length; i++){
                post_grades_dict[posts[i].postID] = 0
                for (let j = 0; j < sortedCategoriesList.length; j++){
                    if (posts[i].categoriesList.includes(sortedCategoriesList[j][0])){
                        var temp_value = post_grades_dict[posts[i].postID]
                        new_value = temp_value + sortedCategoriesList[j][1]
                        post_grades_dict[posts[i].postID] = new_value
                    }
                }
            }
            post_grades_dict = sort_dict(post_grades_dict).reverse()
            all_postID_list_sorted = []
            for (let i = 0; i < post_grades_dict.length; i++){
                all_postID_list_sorted.push(post_grades_dict[i][0])
            }
            all_posts_list_sorted = []
            for (let i = 0; i < all_postID_list_sorted.length; i++) {
                for (let j = 0; j < posts.length; j++) {
                    if (all_postID_list_sorted[i] == posts[j]['postID']){
                        if (posts[j]['isDeleted'] == false){
                            all_posts_list_sorted.push(posts[j])
                        }
                    }
                }
            }
            console.log(all_posts_list_sorted)
            res.status(200).send(all_posts_list_sorted)
        }
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
}

function sortCategoriesOfUserName (postsOfUserName){
    categories = {
        'forFamilies': 0,
        'waterTrails': 0,
        'food': 0,
        'romantic': 0,
        'kids': 0,
        'viewPoint': 0,
        'springs': 0,
        'picnic': 0
    }

    for (let i = 0; i < postsOfUserName.length; i++) {
        currentCategoriesList = postsOfUserName[i].categoriesList.split(",")   
        currentCategoriesList.pop() 
        for (let j = 0; j < currentCategoriesList.length; j++){
            categories[currentCategoriesList[j]] = categories[currentCategoriesList[j]] + 1
        }
    }
    sortedCategoriesList = sort_dict(categories)
    return sortedCategoriesList
}

function sort_dict(dict) {
    // Create items array
    var sorted_dict = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
    });
    // Sort the array based on the second element
    sorted_dict.sort(function(first, second) {
        return second[1] - first[1];
    });
    return sorted_dict.reverse();
}


module.exports = {
    getPosts,
    addNewPost,
    getPostById,
    getPostsbyUsername,
    editPost,
    deletePost,
    getLikedPostsbyUserName,
    partialPostSearch,
    getAllPostsBySortAlgorithm
}