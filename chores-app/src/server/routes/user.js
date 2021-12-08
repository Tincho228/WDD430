
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
    User.find()
    .then(listUser => {
        res.status(200).json({
            message:"User´s list founded successfully",
            list:listUser
        })
    })
    .catch(error => {
        res.status(500).json({
            message:"An error ocurred",
            error:error
        });
    })
});

router.post('/signup', function(req, res, next) {
    const {id, name, password, admin} = req.body
    const newUser = new User ({
        id:id,
        name:name,
        password:password,
        admin:admin
    })
    newUser.save()
    .then(createdUser => {
        const token = jwt.sign({id: newUser.id, }, 'secretKey')
        res.status(201).json({
          token:token,
          message: 'User added successfully',
          userId: createdUser.id
          
        });
        
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
    
});
router.post('/signin', function(req, res, next){
    const { name, password } = req.body;
    User.findOne({name:name})
    .then(user => {
        const userFounded = user;
        console.log(user)
        if((!user) || (user === null))
        return res.status(401).json ({
            message:'No user found'

        })
        if(user.password !== password)
        return res.status(401).json ({
            message:'Password incorrect'
            
        })    
        const token = jwt.sign({id:user.id}, 'secretKey');
        res.status(200).json({
            message:'Sign in successfully',
            token:token,
            userId:user.id
        })
        
      })
      .catch(error => {
        return res.status(500).json({
          message: 'User not found.',
          error: { user: 'User not found'}
        });
      });
})
router.get('/task', function(req, res, next) {
    res.status(200).json([
        {
            _id:1,
            name:'task one',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        },
        {
            _id:2,
            name:'task two',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        },
        {
            _id:3,
            name:'task three',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        }
])
    
});
router.get('/private-task', verifyToken, function(req, res, next) {
    // Dummy data
    res.status(200).json([
        {
            _id:1,
            name:'task one',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        },
        {
            _id:2,
            name:'task two',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        },
        {
            _id:3,
            name:'task three',
            description:"lorem ipsum",
            date: '2036595-696-98-2'
        }
])
});

router.delete("/:id", (req, res, next) => {
    User.findOne({ id: req.params.id })
      .then(user => {
        User.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "User deleted successfully"
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
          message: 'User not found.',
          error: { contact: 'User not found'}
        });
      });
  });


module.exports = router;

function verifyToken(req, res, next) {

    if(!(req.headers.authorization)){
        return res.status(401).send("Unathorized")
        
    }
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    // Check if token is not null
    if(token === null){
        return res.status(401).send("Unathorized")
    }
    // Verifying token
    const payload = jwt.verify(token, 'secretKey')
    // Exracting User token information
    req.userId = payload.id

    next()

}