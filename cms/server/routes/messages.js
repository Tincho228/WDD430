const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    Message.find()
        .then(messages => {
        res.status(200)({
            message: "Messages fetched successfully"
        })
        res.json(messages)
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
         });
 });

 router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxMessageId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Message added successfully',
          document: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.name = req.body.name;
        message.description = req.body.description;
        message.url = req.body.url;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(document => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

  module.exports = router; 