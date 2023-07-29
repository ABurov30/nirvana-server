const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    console.log(req.body);

    const hashpass = await bcrypt.hash(password, 10);
    const [foundUser, created] = await User.findOrCreate({
      where: {email},
      defaults: {
        nickname,
        hashpass,
      },
    });

    if (!created) return res.status(401).json({ message: 'Email is in use' });

    req.session.user = foundUser;

    return res.json(foundUser);
  } catch (e) {
    console.log(e);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) return res.status(401).json({ message: 'No such email' });

    if (await bcrypt.compare(password, foundUser.hashpass)) {
      req.session.user = foundUser;
      return res.json(foundUser);
    }

    return res.status(401).json({ message: 'Wrong password' });
  } catch (e) {
    console.log(e);
  }
});

authRouter.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

authRouter.get('/check', async (req, res) => {
  try {
    if (req.session?.user?.id) {
      return res.json(req.session.user);
    }
    return res.sendStatus(401);
  } catch (e) {
    console.log(e);
  }
});

module.exports = authRouter;
