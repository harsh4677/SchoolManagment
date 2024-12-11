const user = require('../db/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const generateToken = (payload)=>{
   return jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.EXPIRESIN
    })
}

const signup = catchAsync(async (req, res, next)=>{
    const body = req.body;

    const newSchool = await user.create({
        name: body.name,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
        password: body.password,
        confirmPassword : body.confirmPassword,
    })

    if(!newSchool){
        return next(new AppError('Failed to create User', 400))
    }

    const result = newSchool.toJSON()

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })

    return res.status(201).json({
        status:'success',
        data: result,
    })
})

const login = catchAsync (async (req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide Email and Password', 400))
    }

    const result = await user.findOne({where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))){
        return next(new AppError('Email or Password is Incorrect', 401))
    }

    const token = generateToken({
        id: result.id,
    })

    return res.json({
        status: 'Success',
        token,
    })
})

const authentication =  catchAsync( async(req, res, next)=>{
    //1. get the token from header 
    let idtoken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        idtoken = req.headers.authorization.split(' ')[1];
    }
    if(!idtoken) {
        return next(new AppError('Please login to gain the access', 401))
    }

    //2. Token verification 
    const tokenDetail = jwt.verify(idtoken, process.env.JWT_SECRET)

    //3. get the user detail from the db and add to req  object
    const freshUser = await user.findByPk(tokenDetail.id)

    if(!freshUser){
        return next(new AppError('User no loger exists'))
    }
    req.user = freshUser;
    return next();
})

module.exports = {signup, login, authentication, retrictTo}