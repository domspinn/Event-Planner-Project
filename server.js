const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);

app.set('view engine', 'handlebars');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const homeRoutes = require('./routes/homeRoutes');
const event = require('./models/Event')

app.use(authRoutes);
app.use(eventRoutes);

app.get('/', (req, res) => {
  res.render('home', { title: 'Event Planner', user: req.user });
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
