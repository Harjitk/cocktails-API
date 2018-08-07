const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID;


server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

// connect

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }
  const db = client.db("cocktailsdb");
  console.log("Connected to database");

  // create a cocktail
  // http://localhost:3000/api/cocktails

  server.post('/api/cocktails', function(req, res){
    const cocktailCollection = db.collection('cocktails');
    const cocktailToSave = req.body;
    cocktailCollection.save(cocktailToSave, function(err, result){
      if(err){
        console.log(err);
        res.status(500)
        res.send();
      }
      console.log('saved to database');
      res.status(201);
      res.json(result.ops[0]);

    })
  })
  // show all cocktails-
  // http://localhost:3000/api/cocktails

  server.get('/api/cocktails', function(req,res){
    const cocktailCollection = db.collection('cocktails');
    cocktailCollection.find().toArray(function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result);
    })
  })

  // update a cocktail- in insomnia put in id from show all and update something
  // that already exists
  // http://localhost:3000/api/cocktails/5b69980a8c890d79e78225c3

  server.put('/api/cocktails/:id', function(req, res){
    const cocktailCollection = db.collection('cocktails');
    const objectID = ObjectID(req.params.id);
    const filterObject = {_id: objectID};
    const updateData = req.body;

    cocktailCollection.update(filterObject, updateData, function(err, result){
      if(err){
        res.status(500);
        res.send();
      }
      res.status(200);
      res.json(result);
      res.send();
    })
  })

  // delete all cocktails- http://localhost:3000/api/cocktails

  server.delete('/api/cocktails', function(req, res){
    const cocktailCollection = db.collection('cockatils');
    cocktailCollection.deleteMany(function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      console.log('delete all cocktails');
      res.status(201);
      res.json(result);
    })
  })


  // find one cocktail

  server.get('/api/cocktails/:id', function(req, res){
    const cocktailCollection = db.collection('cocktails');
    const objectID = ObjectID(req.params.id);
    const filterObject = {_id: objectID};
    cocktailCollection.findOne(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result);
    })
  })


  //delete one cocktail

  server.delete('/api/cocktails/:id', function(req, res){
    const cocktailCollection = db.collection('cocktails');
    const objectID = ObjectID(req.params.id);
    const filterObject = {_id: objectID};
    cocktailCollection.deleteOne(filterObject, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result);
      res.send();
    })
  })


  server.listen(3000, function(){
    console.log("Listening on port 3000");


  })
})
