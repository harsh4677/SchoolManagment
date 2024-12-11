const catchAsync = require("../utils/catchAsync");
const school = require('../db/models/school'); 
const AppError = require("../utils/appError");

const createSchool = catchAsync(async(req, res, next)=>{
    const body = req.body 
    const Id = req.school.id;

    const newSchool= await school.create({
        name: body.name,
        address: body.address,
        latitude : body.latitude,
        longitude: body.longitude,
    });

    return res.status(201).json({
        status: 'success',
        data: newSchool,
    })
});

const getAllSchool = catchAsync(async (req, res, next)=>{
    const Id = req.user.id
    const result = await school.findAll({include: user, where: {createdBy: Id}});

    return res.json({
        status: 'success',
        message: result,
    })
})



module.exports = {createSchool, getAllSchool}

