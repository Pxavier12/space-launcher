
import {UserModel as user, UserModel} from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'
import { createUserValidator } from '../schemas/apiValidation.js'


export const createUser = async(req, res) => {

   
    const body = req.body
    const {email,pseudo,password}=body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'true',
            message: 'You must fill the form'
        })
    }

    let resp = createUserValidator.validate(body)
    if (resp.error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: resp.error
        })
    }

    let userExists= await user.findOne({pseudo: pseudo})

    if(userExists){
        return res.status(409).json({ success: false, error: true, message: 'Pseudo already taken' })
    }

    userExists= await user.findOne({email: email})
    if(userExists){
        return res.status(409).json({ success: false, error: true, message: 'Email already taken' })
    }
    

    const passwordHash = await bcrypt.hash(password,10)
    const newUserInfo = new user(body)
    
    if (!newUserInfo) {
        return res.status(400).json({ success: false, error: true, message: 'User cannot be created' })
    }
    newUserInfo.password= passwordHash
    const verificationString = uuid()
 
    newUserInfo
        .save()
        .then(() => {
            const {pseudo ,email,password,isVerified} = newUserInfo
            jwt.sign(
                {pseudo ,email,password,isVerified,verificationString}
                ,process.env.JWT_SECRET,
                {expiresIn: '2d'},
            (err,token)=>{
                if (err){
                    return res.status(500).send(err)
                }
                return res.status(200).json({token})
            })
        })
        .catch(error => {
            return res.status(400).json({
                success:false,
                error:false,
                message: 'User not created!',
                extra: error,
            })
        })      
}

export const loginUser = async(req, res) => {
    const {email,password} = req.body
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must provide your credentials'
        })
    }

    const userExists= await user.findOne({email: email})
    if (!userExists && body) {
        return res.status(401).json({ success: false, error: true, message: 'Not Authorized !' })
    }

    const isCorrect = await bcrypt.compare(password,userExists.password)


    if(isCorrect){
        let {pseudo ,email,password,isVerified}= userExists
        jwt.sign({pseudo ,email,password,isVerified},process.env.JWT_SECRET,
        {expiresIn: '2d'},
        (err,token)=>{
            if(err){
                return res.status(500).json(err)
            }else{return res.status(200).json({token})}
        })
    }else{
        return res.status(401).json({ success: false, error: true, message: 'Not Authorized !' })
    }     
}


export const updatePassword = async (req, res) => {

    const {authorization} = req.headers
    const userPseudo= req.params.pseudo
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must provide informations to update',
        })
    }

    if(!authorization){
        return res.status(401).json({
            success: false,
            error: true,
            message: 'User not authorized'
        })
    }
    const token = authorization.split(' ')[1]
    
    jwt.verify(token,process.env.JWT_SECRET,async(err,decodedJSON)=>{
        if(err) return res.status(401).json({success: false, error: true, message: 'Unable to authenticate user'})

        const {pseudo}= decodedJSON;
        if(pseudo!==userPseudo){
            return res.status(403).json({success: false, error: true, message: 'Not allowed to update that user\'s data'})
        }else{
            
            const find = await user.findOne(
                { pseudo: userPseudo}
            ) 
            const isCorrect = await bcrypt.compare(body.oldPassword,find.password)
            if (isCorrect){
                const newPasswordHash = await bcrypt.hash(req.body.password,10)
                await user.findOneAndUpdate(
                    { pseudo: userPseudo},
                    {$set:{password: newPasswordHash}},
                    {returnOriginal: false},
                ).then((response)=>{
                    let {pseudo ,email,password,isVerified} = response
                    jwt.sign(
                        {pseudo ,email,password,isVerified},
                        process.env.JWT_SECRET,
                        {expiresIn: '2d'},
                    (err,token)=>{
                        if (err){
                            return res.status(500).send({success: false, error: true, message: err})
                        }
                        return res.status(200).json({token})
                    })
                }) 
            }else{
                return res.status(401).json({ success: false, error: true, message: 'Not Authorized !' })
            }
            
        }
    })
}


export const updateUser = async (req, res) => {

    const {authorization} = req.headers
    const userPseudo= req.params.pseudo
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'You must provide informations to update',
        })
    }

    if(!authorization){
        return res.status(401).json({
            success: false,
            error: true, 
            message: 'User not authorized'
        })
    }
    const token = authorization.split(' ')[1]
    
    jwt.verify(token,process.env.JWT_SECRET,async(err,decodedJSON)=>{
        if(err) return res.status(401).json({success: false, error: true, message: 'Unable to authenticate user'})
        const {pseudo}= decodedJSON;
        if(pseudo!==userPseudo){
            return res.status(403).json({success: false, error: true, message: 'Not allowed to update that user\'s data'})
        }else{
            await user.findOneAndUpdate(
                { pseudo: userPseudo}
            ).then((response)=>{
                
                let {pseudo ,email,password,isVerified} = response
                jwt.sign(
                    {pseudo ,email,password,isVerified},
                    process.env.JWT_SECRET,
                    {expiresIn: '2d'},
                (err,token)=>{
                    if (err){
                        return res.status(500).send({success: false, error: true, message: err})
                    }
                    return res.status(200).json({token})
                })
            }) 
        }
    })
}


export const getUsers = async (req, res) => {
    await UserModel.find({},'-password' ,(err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users list empty` })
        }

        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}