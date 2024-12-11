const { authentication } = require('../controller/authController');
const { createProject, getAllProject} = require('../controller/projectController')

const router = require('express').Router()

router
    .route('/addschool')
    .post(authentication, createProject)

router
    .route('/listSchools')
    .get(authentication, getAllSchool);

module.exports = router;


