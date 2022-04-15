// add middlewares here related to projects
const Projects = require('./projects-model');

function validateProject(req, res, next){
    if (typeof req.body.name != 'string' || req.body.name.trim() === '' || typeof req.body.description != 'string' || req.body.description.trim() === '' ) {
        res.status(400).json({message : 'You need a name!'})
        return
    }
    req.project = {name: req.body.name.trim()};
    next();
}



function projectIdExists(req, res, next) {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            req.existingProject = project;
            next();
        } else {
            res.status(404).json({message : 'darn try again!'})
        }
    })
    .catch(err => {
        res.status(500).json({
            message : 'Super Oops!'
        })
    })
}

module.exports = {
    validateProject,
    projectIdExists,
  
}