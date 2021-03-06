// require mongoose
let mongo = require('mongoose');
let ObjectId = mongo.Schema.Types.ObjectId;

// TODO: Install Babel transpiler in order to use imports
// import { Users } from '../models/users';
// import { Comments } from '../models/comments';
// then get rid of the following four lines
let users = require('../models/users-model');
let comments = require('../models/comments-model');
User = users.User;
Comments = comments.Comments;

// TODO: projectMembers should be type:[Users._id]
// TODO: owner should be of type: Users._id
// define ProjectPortalSchema
const ProjectsSchema = mongo.Schema({
    dateCreated: {
        type: Date,
        required: true
    },
    dateModified: {
        type: Date
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    owner: {     
        type: ObjectId, 
        ref: 'User',
        required: true
    },
    projectMembers:  [  
        {
          type:ObjectId, 
          ref: 'User'
        }
    ],
    favorites: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    techStack: [String],
    repositoryLink: String,
    projectDemo: String,
    labels: [String]
});

// convert schema to project model and export
const Project = module.exports = mongo.model('Project',ProjectsSchema);
