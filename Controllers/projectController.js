const projects = require('../models/projectModel')

exports.addProjectController = async (req,res)=>{
    // console.log("inside add project function");
    const {title,languages,overview,github,website} = req.body
    const userId = req.payload
    const projectimg = req.file.filename
    console.log(userId,title,languages,overview,github,website,projectimg);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project alread in our database... Add another one!!!")
        }else{
            const newProject = new projects({
                userId,title,languages,overview,github,website,projectimg
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getHomeProjects = async(req, res)=>{
    // console.log("Inside getHomeProjects");
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.allProjectsController = async (req, res)=>{
    console.log("inside allprojects");
    const searchKey = req.query.search
    const query = {
        languages : {
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getUserProjectsController = async (req, res)=>{
    // console.log("inside getUserProjectsController");
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editProjectController = async (req, res)=>{
    console.log("Inside editProjectController");
    const {pid} = req.params
    const {title, languages, overview, github, website, projectimg} = req.body
    const uploadimg = req.file?req.file.filename:projectimg
    const userId = req.payload
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{title,languages,overview,github,website,projectimg,userId},{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    const {pid} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}