const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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

const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const rsvpController = require('./controllers/rsvpController');

app.get('/login', (req, res) => res.render('login', { title: 'Login' }));
app.post('/login', userController.login);

app.get('/register', (req, res) => res.render('register', { title: 'Register' }));
app.post('/register', userController.register);

app.get('/events', eventController.getAllEvents);
app.get('/events/new', (req, res) => res.render('createEvent', { title: 'Create Event' }));
app.post('/events', eventController.createEvent);
app.get('/events/:id/edit', eventController.renderEditEventPage);
app.put('/events/:id', eventController.updateEvent);
app.delete('/events/:id', eventController.deleteEvent);

app.post('/events/:eventId/rsvp', rsvpController.createRSVP);
app.delete('/events/:eventId/rsvp', rsvpController.deleteRSVP);

app.get('/auth/google', eventController.authGoogle);
app.get('/oauth2callback', eventController.oauth2callback);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.render('home', { title: 'Event Planner' });
});

// app.get('/login', (req, res) => {
//   res.render('login', { title: 'Login' });
// });

// app.get('/register', (req, res) => {
//   res.render('register', { title: 'Register' });
// });

// app.use('/user', require('./routes/api/userRoutes'));

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
