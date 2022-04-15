const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require('morgan')
const projectRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(helmet());
server.use(morgan('dev'))

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;
