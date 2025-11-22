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

// Games Data with full details
const gamesData = [
    {
        id: 'wing-it',
        title: 'WING-IT',
        genre: 'Shoot \'em up / Boss Rush',
        vibe: 'Cartoony 3D toybox aesthetic, colorful',
        description: 'From the imagination of a kid named Medy. Play as "The Ace" (toy plane) vs "The Mothership". Blast Carrier Planes for random toy-box powerups!',
        featured: true,
        platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/', icon: 'steam' },
            { name: 'itch.io', url: 'https://itch.io/', icon: 'itch' }
        ],
        hasDemo: false,
        demoMobileCompatible: false,
        demoEmbed: 'https://itch.io/embed-upload/placeholder-wing-it',
        trailerUrl: 'https://www.youtube.com/embed/-uZTbNMUfZw',
        bannerImage: '/images/wing-it/wing-it-banner.jpg',
        logoImage: '/images/wing-it/wing-it-logo.png',
        thumbnail: '/images/wing-it/wing-it-thumb.jpg',
        featureSideImage: '/images/wing-it/wing-it-feature.jpg',
        rating: 'EVERYONE 10+',
        players: '1-2 Player',
        releaseDate: 'Q4 2026',
        sections: {
            about: 'An intense boss-rush shooter where you battle the evil Mothership! Collect random powerups from destroyed carrier planes and strategize your way to victory. Navigate through increasingly difficult waves of enemies in this fast-paced aerial combat experience.',
            features: [
                'Fast-paced shoot \'em up action',
                'Boss rush gameplay with intense battles',
                'Random powerup system for varied strategies',
                'Cartoony 3D graphics with vibrant colors',
                'Challenging difficulty curve',
                'Multiple difficulty modes'
            ],
            media: [
                { type: 'video', url: 'https://www.youtube.com/embed/-uZTbNMUfZw', title: 'Gameplay Trailer' },
                { type: 'image', url: '/images/wing-it/screenshot1.jpg', title: '-' },
                { type: 'image', url: '/images/wing-it/screenshot2.jpg', title: '-' },
                { type: 'image', url: '/images/wing-it/screenshot3.jpg', title: '-' },
                { type: 'image', url: '/images/wing-it/screenshot4.jpg', title: '-' }
            ]
        }
    },
    {
        id: 'torch-it',
        title: 'Torch It!',
        genre: 'Single-player Puzzle Platformer',
        vibe: 'Cartoony prehistoric / Flintstones-style fun',
        description: 'You are a caveman protecting the last flame. Avoid wind, rain, and rivers. Carry the torch from the sky to your cave before it burns out!',
        featured: false,
        platforms: [
            { name: 'itch.io', url: 'https://itch.io/', icon: 'itch' }
        ],
        hasDemo: false,
        demoMobileCompatible: false,
        trailerUrl: 'https://www.youtube.com/embed/OlL80Z_YfY8?si',
        bannerImage: '/images/torch-it/torch-it-banner.jpg',
        logoImage: '/images/torch-it/torch-it-logo.png',
        thumbnail: '/images/torch-it/torch-it-thumb.jpg',
        featureSideImage: '/images/torch-it/torch-it-feature.jpg',
        rating: 'EVERYONE 10+',
        players: '1 Player',
        releaseDate: 'Available Now',
        sections: {
            about: 'A prehistoric puzzle adventure where you must protect the last flame! Navigate through dangerous environments and keep your torch lit while avoiding natural hazards.',
            features: [
                'Unique torch mechanic',
                'Environmental hazards to avoid',
                'Puzzle platforming challenges',
                'Charming prehistoric theme',
                'Speedrun-friendly design'
            ],
            media: [
                { type: 'video', url: 'https://www.youtube.com/embed/OlL80Z_YfY8?si', title: 'Gameplay Trailer' },
                { type: 'image', url: '/images/torch-it/screenshot1.jpg', title: 'Main Menu' },
                { type: 'image', url: '/images/torch-it/screenshot2.jpg', title: 'Level 1' },
                { type: 'image', url: '/images/torch-it/screenshot3.jpg', title: 'Level 2' },
                { type: 'image', url: '/images/torch-it/screenshot4.jpg', title: 'Level 3' },
                { type: 'image', url: '/images/torch-it/screenshot5.jpg', title: 'Level 4' },
            ]
        }
    }
];

// Team Members Data
const teamMembers = [
    {
        name: 'Mirabilis Sera Alym Maqomy',
        role: 'Sound Engineer',
        image: '/images/team/alym.png',
        instagram: 'https://instagram.com/sseldneseldine',
        linkedin: 'https://www.linkedin.com/company/a-fair-studio'
    },
    {
        name: 'M. Fahril Ilmi',
        role: 'Programmer',
        image: '/images/team/fahril.png',
        instagram: 'https://instagram.com/f3fahril',
        linkedin: 'https://www.linkedin.com/in/m-fahril-ilmi-492432322'
    },
    {
        name: 'Mohammad Izza Al Ajib',
        role: '3D Artist',
        image: '/images/team/ajib.png',
        instagram: 'https://instagram.com/your_kingss',
        linkedin: 'https://www.linkedin.com/in/izza-al-ajib-726109335'
    },
    {
        name: 'Irvan Faturohman',
        role: 'Programmer',
        image: '/images/team/irvan.png',
        instagram: 'https://instagram.com/if.irvan',
        linkedin: 'https://www.linkedin.com/in/irvan-faturohman'
    },
    {
        name: 'Muhammad Raya Ramadan',
        role: 'Project Manager',
        image: '/images/team/raya.png',
        instagram: 'https://instagram.com/rayakren',
        linkedin: 'https://www.linkedin.com/in/rayakren'
    }
];

// Routes
app.get('/', (req, res) => {
    const featuredGame = gamesData.find(game => game.featured);
    res.render('index', { featuredGame, gamesData });
});

app.get('/about', (req, res) => {
    res.render('about', { teamMembers });
});

app.get('/games', (req, res) => {
    res.render('games/index', { games: gamesData });
});

app.get('/games/:gameId', (req, res) => {
    const game = gamesData.find(g => g.id === req.params.gameId);
    if (!game) {
        return res.status(404).send('Game not found');
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
    res.status(404).send('Page not found');
});

// Export for Vercel
module.exports = app;

// Start server if running locally
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🎮 A FAIR Studio server running on http://localhost:${PORT}`);
    });
}
