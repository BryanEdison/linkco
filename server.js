require("dotenv").config();
const express = require("express"); // the library we will use to handle requests
const mongodb = require("mongodb"); // load mongodb
const crypto = require("crypto");
const csprng = require('csprng');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const port = 4567; // port to listen on

var corsUrl;

if (process.env.NODE_ENV === 'development') {
  corsUrl = process.env.LOCAL_URL  // http://localhost:8080
} else if (process.env.NODE_ENV === 'production') {
  corsUrl = process.env.DEPLOY_URL // http://http://linkco.herokuapp.com/
}

const { verify } = require('./src/services/middleware')
const app = express(); // instantiate express
const ObjectID = require('mongodb').ObjectID;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("build"));

app.use(cors({credentials: true, origin: 'http://localhost:4567'})); // allow Cross-domain requests
app.use(require("body-parser").json()); // automatically parses request data to JSON

app.use(function(req, res, next) {
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "x-access-token, Origin, Content-Type, Accept"
  // );
  res.header('Access-Control-Allow-Origin', 'http://localhost:4567');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "content-type");

  next();
});

// make sure in the free tier of MongoDB atlas when connecting, to
// select version 2.2.* as the node.js driver instead of the default 3.0
// put your URI HERE ⬇
const uri = process.env.MONGOLAB_URI;

// connect to your MongoDB database through your URI. 
// The connect() function takes a uri and callback function as arguments.
mongodb.MongoClient.connect(uri, (err, db) => {
  // connect to your specific collection (a.k.a database) that you specified at the end of your URI (/database)
  const collection = db.collection("USERS_COLLECTION");

  // Responds to GET requests with the route parameter being the username.
  // Returns with the JSON data about the user (if there is a user with that username)
  // Example request: https://mynodeserver.com/myusername

  app.post("/login", (req, res) => {
    collection.find({ username: req.body.username }).toArray((err, docs) => {
      if (err) { // if an error occurred
        res.send("An error occured in getting the user info.");
      } else { 
        // there were matches (there are users with that username)
        if (docs.length > 0) {
          // get the first users password (each user should have a unique username)
          const password = docs[0].password;
          const salt = docs[0].salt;
          const hashedQueryPassword = hash(`${salt}${req.body.password}`); 

          // if there was no password sent in the query of the url (after the `?`)
          if (!req.body.password) {
            res.send("There was no password associated with the GET req URL parameters.");
          }
          // if the password that was sent with the get request matches the user's password
          if (password === hashedQueryPassword) { // make sure the pass URL param is a string (interpolate it)
            // send back the user's information

              //create the access token with the shorter lifespan
              let token = jwt.sign({ id: docs[0]._id }, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
              })  

              //create the refresh token with the longer lifespan
              let refreshToken = jwt.sign({ id: docs[0]._id }, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })

            //use secure=true as well for HTTPS only, also { httpOnly: true}
            res.cookie("jwt", refreshToken)
            res.send({ ...docs[0], token });
          } else {
            // otherwise, the password was wrong
            res.send("Wrong password.");
          }
        } else {
          res.send("There were no users with that name found. ");
        }
      }
    });
  });

  app.post("/profile/:id", (req, res, next) => verify(req, res, next), (req, res) => {
    let userid = req.params.id;
    collection.find({ _id: ObjectID(userid) }).toArray((err, docs) => {
      if (err) {
        res.send("An error occured in getting the user info.");
        console.log(err)
      } else {
        if (docs.length > 0) {
          res.send({ user: docs[0] })
        } else {
          res.send("Original username.");
        }
      }
    });    
  });
  
// Check if username exists
  app.post("/userNameCheck", (req, res) => {
    collection.find({ username: req.body.username }).toArray((err, docs) => {
      if (err) { // if an error occurred
        res.send("An error occured in getting the user info.");
      } else {
        // there were matches (there are users with that username)
        if (docs.length > 0) {
          res.status(400).send({ message: 'Username already in use'})
        } else {
          res.send("Original username.");
        }
      }
    });
  });

  //Check if email exists already
  app.post("/emailCheck", (req, res) => {
    collection.find({ email: req.body.email }).toArray((err, docs) => {
      if (err) { // if an error occurred
        res.send("An error occured in getting the user info.");
      } else {
        // there were matches (there are users with that email)
        if (docs.length > 0) {
          res.status(400).send({ message: 'Email already in use'})
        } else {
          res.send("Original Email.");
        }
      }
    });
  });

  // Responds to POST requests with the route parameter being the username.
  // Creates a new user in the collection with the `user` parameter and the JSON sent with the req in the `body` property
  // Example request: https://mynodeserver.com/myNEWusername
// the password is sent in the body of the request as the `pass` field
  app.post("/signup/:user", (req, res) => {
    // generate the salt using the npm package 'csprng'. 
    // The first argument is the number of bits and the second is the radix (how many characters to choose from, basically)
    const salt = csprng(160, 36);
    
    // hash the password with the salt prepended 
    req.body.password = hash(`${salt}${req.body.password}`); 

    collection.find({ $or: [ {username: req.body.username}, {email: req.body.email}] }).toArray((err, docs) => {
      if (err) { // if an error occurred
        res.send("An error occured in posting info.");
      } else {
        // there were matches (there are users with that username)
        if (docs.length > 0) {
          res.status(400).send({ message: 'Credentials already in use'})
        } else {
              // inserts a new document on the server. make sure to store the hash and salt
          collection.insertOne(
            { email: req.body.email, username: req.body.username, salt, password: req.body.password }, // this is one object to insert. `requst.params` gets the url parameters
            (err, r) => {
              if (err) {
                res.send("An error occured.");
              } else {
                res.send("All went well.");
              }
            }
          );
        }
      }
    });
  });

  app.put("/:user", (req, res, next) => verify(req, res, next), (req, res) => {
    let userid = req.body.id;
    collection.updateOne(
      { _id: ObjectID(userid)}, {$set: {links: req.body.links }},
      (err, r) => {
        if (err) {
          console.log("An error occurred in updating information");
          res.send(err)
        } else {
          console.log(r, 'response')
          res.send(r)
        }
      }
    );
  });

  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  // listen for requests
  var listener = app.listen(port, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});

function hash(pwd) { 
  return crypto
           .createHash("sha256") 
           .update(pwd) 
           .digest("base64"); 
}