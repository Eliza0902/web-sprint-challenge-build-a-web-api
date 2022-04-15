// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model')
const {validateProject, projectIdExists, checkCompleted} = require('./projects-middleware')

const router = express.Router();

function rootPath(req, res, next) {
    Project.get(req.query.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        next({err})
    })
}

router.get('/', rootPath);

router.get('/:id', projectIdExists, (req, res) => {
    res.json(req.existingProject);
})

router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err =>
        res.status(400).json(err))
})

router.put('/:id', validateProject, projectIdExists, (req, res) => {
    Project.update(req.params.id, req.body)
    .then(() => { if(req.body.completed != null )
        {res.status(200).json({ ...req.existingProject, ...req.body})} else {
         res.status(400).json({message : 'All done here Captain' })   
        }
    })
    .catch(err => res.status(400).json (err))
})


router.delete('/:id', projectIdExists, (req, res) => {
    Project.remove(req.existingProject.id)
    .then(() => {
        res.status(200).json(req.existingProject)
    })
    .catch(err => res.status(400).json({message : 'Well, we tried!'}))
})

router.get('/:id/actions', projectIdExists, (req, res, next) => {
   Project.getProjectActions(req.params.id)
   .then(actions => {
       res.status(200).json(actions)
   }) 
   .catch(error => next({error}))
})


module.exports = router