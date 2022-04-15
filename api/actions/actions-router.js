// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const {validateAction, actionIdExists} = require('./actions-middlware');

const router = express.Router();

function rootPath(req, res, next) {
    Actions.get(req.query.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        next({err})
    })
}

router.get('/', rootPath)

router.get('/:id', actionIdExists, (req, res) => {
    res.json(req.existingAction);
})

router.post('/', validateAction, actionIdExists, (req, res) =>{
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err =>
        res.status(400).json(err))
})

router.put('/:id', validateAction, actionIdExists, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(() => { if(req.body.completed != null )
        {res.status(200).json({ ...req.existingAction, ...req.body})} else {
         res.status(400).json({message : 'All done here Captain' })   
        }
    })
    .catch(err => res.status(400).json (err))
})

router.delete('/:id', actionIdExists, (req, res) => {
    Actions.remove(req.existingAction.id)
    .then(() => {
        res.status(200).json(req.existingAction)
    })
    .catch(err => res.status(400).json({message : 'Well, we tried!'}))
})


module.exports = router