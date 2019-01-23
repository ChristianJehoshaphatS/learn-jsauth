const User = require("../models").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  const users = await User.findAll();

  res.json({ users });
};

exports.createUser = async (req, res) => {
  const SALT_WORK_FACTOR = 12;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  req.body.password = await bcrypt.hash(req.body.password, salt);

  const user = await User.create(req.body);
  res.json({ user });
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({ user });
};

exports.updateUserById = async (req, res) => {
  const [isUpdated] = await User.update(req.body, {
    where: { id: req.params.id }
  });

  if (Boolean(isUpdated)) {
    const user = await User.findById(req.params.id);

    res.json({ user });
  } else {
    res.json({});
  }
};

exports.deleteUserById = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
};
exports.login = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.body.email }
  });

  // check user account
  if (user === null) {
    return res.send("User not Found");
  }

  // check valid password
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // check password
  if (!validPassword) {
    return res.send("Not Valid Password");
  }

  // generate token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "You are Logged In",
    id: user.id,
    token
  });
};
