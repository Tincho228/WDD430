var express = require('express');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
var router = express.Router();

router.get('/', (req, res, next) => {
    Contact.find()
        //.populate('group')
        .then(contacts => {
          console.log("fetching contacts")
          console.log(contacts)
        res.status(200).json({
            contacts:contacts,
            message: "Contacts fetched successfully"
        })
        })
        .catch(error => {
            res.status(500).json({
            message: 'An error occurred',
            error: error
          });
         });
 });


router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");
  
    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    document.save()
      .then(createdContact => {
        res.status(201).json({
          message: 'Document added successfully',
          document: createdContact
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
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        contact.name = req.body.name;
        contact.description = req.body.description;
        contact.url = req.body.url;
  
        Contact.updateOne({ id: req.params.id }, contact)
          .then(result => {
            res.status(204).json({
              message: 'Contact updated successfully'
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
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });
  
router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
      .then(contact => {
        Contact.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Contact deleted successfully"
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
          message: 'Contact not found.',
          error: { contact: 'Contact not found'}
        });
      });
  });

module.exports = router;
