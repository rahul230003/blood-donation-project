var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var methodOverride = require('method-override')
var app=express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
mongoose.connect('mongodb://localhost/blood_donation');
var Schema = new mongoose.Schema({
email : String,
name: String,
bloodgrp : String
});
var user = mongoose.model('emp', Schema);

app.post('/new', function(req, res){
    new user({
    email : req.body.email,
    name: req.body.name,
    bloodgrp : req.body.bloodgrp
    }).save(function(err, doc){
    if(err) 
    {
    res.json(err);
    }
    else{ 
    res.sendFile(__dirname + '/success.html');
    }
    });
    });
    
app.get('/view', function(req, res){
        user.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render(__dirname + '/index.jade', {users: docs});
        });
        });
        
app.get("/",function(req,res){
    res.sendFile(__dirname + '/skcf.html');
});
app.get("/form.html",function(req,res){
    res.sendFile(__dirname+'/form.html');
});
app.get('/home',function(req,res){
    res.redirect('/');
});
app.listen(3000,function(){
    console.log("3000");
});


