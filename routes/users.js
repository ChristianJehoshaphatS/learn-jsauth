const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router
  .route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)

router
  .route('/:id')
  .get(UserController.getUserById)
  .patch(UserController.updateUserById)
  .delete(UserController.deleteUserById)

module.exports = router
