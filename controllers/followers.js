const Follower=require('../models/followers_model')

const follow = (req,res)=>{
    const relation = Follower({
        from: req.body.from,
        to: req.body.to
    })

    relation.save((error,newrelation)=>{
        if (error){
            res.status(400).send({
                'status': 'failed',
                'error': error.message
                
            })
        }
        else{
            res.status(200).send({
                'status': 'ok',
            })
        }
    })
}

const checkIfFollow = async(req,res)=>{
    const query = {
        from: req.body.from,
        to: req.body.to
    }
    relation = await Follower.findOne(query)
    if (relation!=null){
        res.status(200).send(true)
    }
    else{
        res.status(200).send(false)
    }      
}

const unfollow = async(req,res)=>{
    const query = {
        from: req.body.from,
        to: req.body.to
    }
    Follower.deleteOne(query, function(err,obj){
        if (err) throw err;
        else{
            res.status(200).send()
        }
    });
}
module.exports = {
    follow,
    checkIfFollow,
    unfollow
    }