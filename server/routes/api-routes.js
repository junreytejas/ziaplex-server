const { Router } = require('express')
const mongoose = require('mongoose')
const Model = require('../models/models')

const router = Router()

const users = []
const db = 'mongodb://127.0.0.1:27017/ziaplex-database'

mongoose.connect(db, (err, res) => {
    if (err) {
        console.log('Failed to connected to ' + db)
    } else {
        console.log('Connected to ' + db)
    }
})

// GET
router.get('/users' , function(req, res){
    
    Model.find({} , (err, users) => {
        if(err){
            res.status(404).send(err)
        }else {
            res.status(200).send(users)
        }
    })
})

router.get('/users/:id', getUser, function(req, res, next) {
    
    res.json(res.user)  
    
});

// post

router.post('/users', async function(req, res){
    // let model = new Model(req.body)
    // model.save()
    // res.status(201).send(model)

      
  if (req.body.batch) {
    Model.create(req.body.batch, function(error){
      if (error) {
        res.send(error)
      } else {
        res.send(req.body)
      }
    })


  } else {
    const user = new Model({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    
    
    try {
      const newUser = await user.save()
      res.status(201).json(req.body)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  }


    
})


// UPDATE ONE
router.patch('/users/:id', getUser,async function(req, res, next) {
    if(req.body.fullname != null) {
      res.user.fullname = req.body.fullname
    }
    if(req.body.username != null) {
      res.user.username = req.body.username
    }
    if(req.body.email != null) {
      res.user.email = req.body.email
    }
    if(req.body.password != null) {
      res.user.password = req.body.password
    }
    
    try {
      const updatedUser = await res.user.save()
      res.json(updatedUser)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  });
  
  // DELETE ONE
  router.delete('/users/:id',getUser, async function(req, res, next) {
    try {
      await res.user.remove()
      res.json({message: "deleted user."})
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  });


async function getUser(req,res,next) {
    let user
    try {
        user = await Model.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message: 'cannot find user.'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
    res.user = user
    next()
}


module.exports = router