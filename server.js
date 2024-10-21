const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./config/database');
const path = require('path');

const app = express();

// Connect to database
connectDB();

//Using Cors
app.use(cors({
    exposedHeaders: ['Content-Range'],
}));

// Analyser les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Body parser middleware
app.use(bodyParser.json());

// Routes
const users = require('./routes/users');
const profiles = require('./routes/profiles');
const games = require('./routes/games');
const sessions = require('./routes/sessions');
const emotions = require('./routes/emotions');
const images = require('./routes/images');
const jeu1questions = require('./routes/jeu1questions');
const personalizedphotos = require('./routes/personalizedphotos');
const jeu2pairs = require('./routes/jeu2pairs');
const jeu3intrus = require('./routes/jeu3intrus');
const jeu4match = require('./routes/jeu4match');
const gamesessions = require('./routes/gamesessions');
const gameresults = require('./routes/gameresults');

app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/games', games);
app.use('/api/sessions', sessions);
app.use('/api/emotions', emotions);
app.use('/api/images', images);
app.use('/api/jeu1questions', jeu1questions);
app.use('/api/personalizedphotos', personalizedphotos);
app.use('/api/jeu2pairs', jeu2pairs);
app.use('/api/jeu3intrus', jeu3intrus);
app.use('/api/jeu4match', jeu4match);
app.use('/api/gamesessions', gamesessions);
app.use('/api/game-results', gameresults);


// Set static folder for serving images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
