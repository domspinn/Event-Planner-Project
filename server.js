const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
const handlebarsLayouts = require('handlebars-layouts');
require('dotenv').config();
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const Handlebars = require('handlebars');
Handlebars.registerHelper(handlebarsLayouts(Handlebars));
app.use(express.static(path.join(__dirname, 'public')));
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
app.get('/', (req, res) => {
  res.render('home', { title: 'Event Planner' });
});
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/rsvps', rsvpRoutes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});