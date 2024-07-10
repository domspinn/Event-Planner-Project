const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const roots = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;