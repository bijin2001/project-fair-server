const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()

// register
router.post('/register',userController.registerController);

// login
router.post('/login',userController.loginController);

// add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectimg'),projectController.addProjectController)

// home project
router.get('/project/get-home',projectController.getHomeProjects)

// all project
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)

// user projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

// edit projects
router.put('/project/:pid/edit',jwtMiddleware,multerMiddleware.single('projectimg'),projectController.editProjectController)


// remove project
router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)

// edit user
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)

module.exports = router
