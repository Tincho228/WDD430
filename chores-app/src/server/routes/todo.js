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
    
    const {id, name, description, executer_id, price, status} = req.body
    const newTodo = new Todo ({
        id:id,
        name:name,
        description:description,
        executer_id:executer_id,
        price:price,
        status: status
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

//Update a todo
router.put('/:id', (req, res, next) => {
  
  Todo.findOne({ id: req.params.id })
    .then(todo => {
      todo.executer_id = req.body.userId;
      todo.status = req.body.status;
      Todo.updateOne({ id: req.params.id }, todo)
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