const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Register icon helper for EJS templates
const { getIcon } = require('./utils/iconHelpers');
app.locals.getIcon = getIcon;

// Games, awards and team are read from the /content folder (see utils/content.js)
const { loadContent, GAMES_DIR, GAMES_MEDIA_URL } = require('./utils/content');
const { games: gamesData, team: teamMembers, awards } = loadContent();

// Game images live next to their game.json in content/games/<id>/
app.use(GAMES_MEDIA_URL, express.static(GAMES_DIR));

// Routes
app.get('/', (req, res) => {
    const featuredGame = gamesData.find(game => game.featured);
    // Games are sorted newest first; the featured one already has its own section
    const recentGames = gamesData.filter(game => game !== featuredGame).slice(0, 3);
    res.render('index', { featuredGame, recentGames, awards });
});

app.get('/about', (req, res) => {
    res.render('about', { teamMembers, awards });
});

app.get('/games', (req, res) => {
    res.render('games/index', { games: gamesData });
});

app.get('/games/:gameId', (req, res) => {
    const game = gamesData.find(g => g.id === req.params.gameId);
    if (!game) {
        return res.status(404).render('404', {
            heading: 'Game Not Found',
            message: 'We could not find that game. It may have been moved or renamed.'
        });
    }
    res.render('games/show', { game });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/privacy', (req, res) => {
    res.render('legal/privacy');
});

app.get('/tos', (req, res) => {
    res.render('legal/tos');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('404', {
        heading: 'Page Not Found',
        message: 'The page you are looking for does not exist.'
    });
});

// Export for Vercel
module.exports = app;

// Start server if running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🎮 A FAIR Studio server running on http://localhost:${PORT}`);
    });
}
