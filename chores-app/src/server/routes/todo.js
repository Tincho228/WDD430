var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const Todo = require('../models/todos')

/* GET home page. */
router.get('/', function(req, res, next) {
    Todo.find()
    .then(listTodo => {
        res.status(200).json({
            message:"Todo list founded successfully",
            list:listTodo
        })
    })
    .catch(error => {
        res.status(500).json({
            message:"An error ocurred",
            error:error
        });
    })
    
});

router.post('/', function(req, res, next) {
    
    const {name, description} = req.body
    console.log(description)
    const newTodo = new Todo ({
        name:name,
        description:description
    })
    newTodo.save()
    .then(createdTodo => {
        res.status(201).json({
          message: 'Todo added successfully',
          document: createdTodo
        });
        
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
    
});
router.delete("/:id", (req, res, next) => {
    Todo.findOne({ id: req.params.id })
      .then(todo => {
        Todo.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Todo deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'Todo error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Todo not found.',
          error: { contact: 'Todo not found'}
        });
      });
  });
module.exports = router;