const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../routes')
const { userInfo } = require('os')

const sendError = (res,code,msg)=>{
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userName = req.body.userName
    const phoneNumber = req.body.phoneNumber
    const imageUrl = req.body.imageUrl
    try{
        const exist = await User.findOne({'email': email})
        if (exist != null){
            return res.status(400).send({
                'status': 'failed',
                'error': 'user exists'
            })    
        }
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, salt)

        const user = User({
            userName: userName,
            password: hashPwd,
            phoneNumber:phoneNumber,
            email: email,
            imageUrl: imageUrl
        })
        newUser = await user.save()
        res.status(200).send(newUser)
    }
    catch(err){
        res.status(400).send({
            'status': 'failed',
            'error': err.message
        })
    }
    
}

const login = async (req,res)=>{
    const password = req.body.password
    const userName = req.body.userName
    if(userName==null || password == null){
        return sendError(res,400,'wrong username or password')        
    }
    try{
        const user = await User.findOne({'userName':userName})
        if (user == null) sendError(res,400,'wrong username or password')

        const match = await bcrypt.compare(password,user.password)
        if(!match) return sendError(res,400,'wrong password')
        
        const accessToken = await jwt.sign(
            {'id':user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION})
        const refreshToken = await jwt.sign(
            {'id': user._id},
            process.env.REFRESH_TOKEN_SECRET
        )
        if (user.tokens == null) user.tokens = [refreshToken]
        else user.tokens.push(refreshToken)
        await user.save()

        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken})
    }
    catch(err){
    }
   
}

const loginApps = async (req,res)=>{
    const userName = req.body.userName
    if(userName==null){
        return sendError(res,400,'wrong username or password')        
    }
    try{
        const user = await User.findOne({'userName':userName})
        if (user == null) sendError(res,400,'wrong username')
        
        const accessToken = await jwt.sign(
            {'id':user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION})
        const refreshToken = await jwt.sign(
            {'id': user._id},
            process.env.REFRESH_TOKEN_SECRET
        )
        if (user.tokens == null) user.tokens = [refreshToken]
        else user.tokens.push(refreshToken)
        await user.save()
        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken})
    }
    catch(err){
        return sendError(res,400,err.message)
    }
}

const logout = async (req,res,next)=>{
    authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo)=>{
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try{
            user = await User.findById(userId)
            if(user == null) return res.status(403).send('invalid request')
            if(!user.tokens.includes(token)){
                user.tokens= [] 
                await user.save()
                return res.status(403).send('invalid request')
            }
            user.tokens.splice(user.tokens.indexOf(token),1)
            await user.save()
            res.status(200).send()
        }
        catch(err){
            res.status(403).send(err.message)
        }
    })
}

const refreshToken = async (req,res)=>{
    authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo)=>{
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try{
            user = await User.findById(userId)
            if(user == null) return res.status(403).send('invalid request')
            if(!user.tokens.includes(token)){
                user.tokens= [] 
                await user.save()
                return res.status(403).send('invalid request')
            }
            const accessToken = await jwt.sign(
                {'id':user._id},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: process.env.JWT_TOKEN_EXPIRATION})
            const refreshToken = await jwt.sign(
                {'id': user._id},
                process.env.REFRESH_TOKEN_SECRET
            )
            user.tokens[user.tokens.indexOf(token)]= refreshToken
            await user.save()
            res.status(200).send({
                'accessToken': accessToken,
            'refreshToken': refreshToken
            })
        }
        catch(err){
            res.status(403).send(err.message)
        }
    })
}

module.exports={
    login,
    register,
    logout,
    refreshToken,
    loginApps
}