const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body, password: req.body.password });
    req.session.userId = user.id;
    res.redirect('/events');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  console.log(req.body.password);
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).render('login', { title: 'Login', error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(user.password, validPassword); 
    if (!validPassword) {
      return res.status(401).render('login', { title: 'Login', error: 'Invalid credentials' });
    }


    req.session.userId = user.id;
    res.redirect('/events');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
