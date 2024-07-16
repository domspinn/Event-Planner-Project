const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/api', (req, res) => {
  res.send('Server testre');
});

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/events', rsvpRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
