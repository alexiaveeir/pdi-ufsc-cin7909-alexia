const express = require('express');
const app = express()

const contactRoute = express.Router();

let Contact = require('../model/Contact');

//add contact
contactRoute.route('add-contact').post((req, res, next)=>{
    Contact.create(req.body, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//all contacts
contactRoute.route('/').get((req, res, next)=>{
    Contact.find(req.body, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//spec contact
contactRoute.route('/read-contact/:id').get((req, res, next)=>{
    Contact.findById(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//update contact 
contactRoute.route('/update-contact/:id').put((req, res, next)=>{
    Contact.findByIdAndUpdate(req.params.id,{$set: req.body}, (error, data) =>{
        if(error){
            return next(error);
            console.log(error);
        }else{
            res.json(data)
            console.log('Update Ok!');
        }
    })
});

//delete contact

contactRoute.route('/read-contact/:id').delete((req, res, next)=>{
    Contact.findByIdAndRemove(req.params.id, (error, data) =>{
        if(error){
            return next(error)
        }else{
            res.status(200).json({msg:data})
        }
    })
});

module.exports = contactRoute;