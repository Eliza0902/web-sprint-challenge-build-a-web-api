// add middlewares here related to actions
const Actions = require('./actions-model')

function validateAction(req, res, next){
    if (typeof req.body.notes != 'string' || req.body.notes.trim() === '' || typeof req.body.description != 'string' ||req.body.description.trim() === '') {
        res.status(400).json({message : 'You are missing some stuffs!'})
        return
    }
    req.project = {notes : req.body.notes.trim(),
                description : req.body.description.trim()};
    next();
}

function actionIdExists(req, res, next){
    Actions.get(req.params.id)
    .then(action => {
        if(action) {
            req.existingAction = action;
            next();
        } else {
            res.status(404).json({message : 'darn, try again!'})
        }
    })
    .catch(err => {
        res.status(500).json({
            message : 'Super Oops!'
        })
    })
}



module.exports = {
    validateAction,
    actionIdExists
}