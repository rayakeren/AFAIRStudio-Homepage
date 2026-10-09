/**
 * Content Loader
 * Reads games, awards and team data from the /content folder.
 *
 * Each game is a folder in content/games/<id>/ containing:
 *   game.json      - text, links, trailer (see README)
 *   banner.*       - full-width header image
 *   logo.*         - optional title art shown over the banner
 *   thumb.*        - card image for listings
 *   feature.*      - image beside the features list
 *   screenshots/   - any number of images, shown in filename order
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const GAMES_DIR = path.join(CONTENT_DIR, 'games');
const GAMES_MEDIA_URL = '/media/games';
const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|gif|avif)$/i;

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function listImages(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => IMAGE_EXTENSIONS.test(file)).sort();
}

/**
 * Turn a screenshot filename into a caption: "02-level-1.jpg" -> "Level 1".
 * Files that are only a number ("03.jpg") get a generic caption.
 */
function screenshotTitle(file, gameTitle, index) {
    const words = path.parse(file).name.replace(/^\d+[-_ ]*/, '').split(/[-_ ]+/).filter(Boolean);
    if (words.length === 0) return `${gameTitle} screenshot ${index + 1}`;
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function loadGame(id, awards) {
    const gameDir = path.join(GAMES_DIR, id);
    const data = readJson(path.join(gameDir, 'game.json'));
    const mediaUrl = `${GAMES_MEDIA_URL}/${id}`;

    const rootImages = listImages(gameDir);
    const findImage = name => {
        const file = rootImages.find(f => path.parse(f).name.toLowerCase() === name);
        return file ? `${mediaUrl}/${file}` : null;
    };

    const screenshots = listImages(path.join(gameDir, 'screenshots')).map((file, index) => ({
        type: 'image',
        url: `${mediaUrl}/screenshots/${file}`,
        title: screenshotTitle(file, data.title, index)
    }));
    const firstScreenshot = screenshots.length > 0 ? screenshots[0].url : null;

    const trailerUrl = data.trailerId ? `https://www.youtube.com/embed/${data.trailerId}` : null;
    const media = trailerUrl
        ? [{ type: 'video', url: trailerUrl, title: 'Gameplay Trailer' }, ...screenshots]
        : screenshots;

    const bannerImage = findImage('banner') || firstScreenshot;

    return {
        id,
        title: data.title,
        order: data.order !== undefined ? data.order : Infinity,
        featured: Boolean(data.featured),
        genre: data.genre,
        description: data.description,
        platforms: data.platforms || [],
        hasDemo: Boolean(data.demo && data.demo.embedUrl),
        demoEmbed: data.demo ? data.demo.embedUrl : null,
        demoMobileCompatible: Boolean(data.demo && data.demo.mobileCompatible),
        trailerUrl,
        bannerImage,
        logoImage: findImage('logo'),
        thumbnail: findImage('thumb') || bannerImage,
        featureSideImage: findImage('feature') || firstScreenshot || bannerImage,
        rating: data.rating || null,
        players: data.players || null,
        releaseDate: data.releaseDate || null,
        updateNotesUrl: data.updateNotesUrl || null,
        awards: awards.filter(award => award.game === id),
        sections: {
            about: data.about || data.description,
            features: data.features || [],
            media
        }
    };
}

function loadContent() {
    const awards = readJson(path.join(CONTENT_DIR, 'awards.json'));
    const team = readJson(path.join(CONTENT_DIR, 'team.json'));

    const games = fs.readdirSync(GAMES_DIR, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && fs.existsSync(path.join(GAMES_DIR, entry.name, 'game.json')))
        .map(entry => loadGame(entry.name, awards))
        .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

    // Let award badges link to and name their game
    const awardsWithGames = awards.map(award => {
        const game = games.find(g => g.id === award.game);
        return { ...award, gameTitle: game ? game.title : null };
    });

    return { games, team, awards: awardsWithGames };
}

module.exports = {
    loadContent,
    GAMES_DIR,
    GAMES_MEDIA_URL
};
