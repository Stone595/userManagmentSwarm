


// Start node and then go on to 'localhost:3000'  on your web Browser

const express = require('express');
const path = require("path");

const mongoose = require('mongoose');

const db = 'mongodb://localhost/mtech'
const port = process.env.PORT || 3000;

const app = express()
mongoose.connect(db)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  age: {type: Number, min: 1, max: 100},
  id: {type: Number, default: Math.random()}
});

const user = mongoose.model('User', userSchema)


app.get('/sortedUsers', (req, res) => {
  user.find({}, (err, data) => {
    if (err) console.log(err )

    const sortedNames = data.sort((a, b) => {return a.age - b.age})
    res.send(`<div><h1>Sorted by age</h1><div>${sortedNames}</div>>/div>`)
  })
})

app.listen(port, (err) => {
   if (err) console.log(err);
   console.log(`App Server listen on port: ${port}`);
});

app.post('/newUser', (req, res) => {
  const newUser = new user();
  newUser.name = req.body.name.trim();
  newUser.role = req.body.role.trim();
  newUser.age = req.body.age.trim(); 
  newUser.email = req.body.email.trim();
  newUser.save((err, data) => {
      if (err) {
          return console.error(err);
      }
      res.send(`Success! Added user`);
  });

});

app.post('/searchUser', (req, res) => {
  let matchedName = req.body.name.trim();

  console.log(matchedName, 'searched user')

  user.findOne({ name: matchedName }, (err, data) => {
      if (err) return console.log(`Oops! ${err}`);
      console.log(`data -- ${JSON.stringify(data)}`);
      let returnMsg = `user name : ${data}`;
      console.log(returnMsg);
      if(data === null) res.send('No user found')
      res.send(returnMsg);
  });
})

app.post('/updateUser', (req, res) => {
  let matchedName = req.body.name.trim();
  let newrole = req.body.role;
  let newEmail = req.body.email;
  let newAge = req.body.age;

  user.findOneAndUpdate( {name: matchedName}, {role: newrole, email: newEmail, age: newAge},
      { new: true }, //return the updated version instead of the pre-updated document
      (err, data) => {
          if (err) return console.log(`Oops! ${err}`);
          let returnMsg = `user name : ${matchedName} New role : ${data.role}`;
          res.send('Succesfully updated');
      });
});

app.post('/removeUser', (req, res) => {
  let matchedName = req.body.name.trim();

  user.findOneAndDelete(
      { name: matchedName },
      (err, data) => {
          if (err) return console.log(`Oops! ${err}`);
          let returnMsg = `User Deleted!`;
          res.send(returnMsg);
      });
})







