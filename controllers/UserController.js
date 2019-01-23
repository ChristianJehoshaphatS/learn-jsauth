const User = require('../models').User

exports.getUsers = async (req, res) => {
  const users = await User.findAll()

  res.json({ users })
}

exports.createUser = async (req, res) => {
  const user = await User.create(req.body)

  res.json({ user })
}

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  res.json({ user })
}

exports.updateUserById = async (req, res) => {
  const [isUpdated] = await User.update(req.body, {
    where: { id: req.params.id }
  })

  if (Boolean(isUpdated)) {
    const user = await User.findById(req.params.id)

    res.json({ user })
  } else {
    res.json({})
  }
}

exports.deleteUserById = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } })

  res.json({})
}
