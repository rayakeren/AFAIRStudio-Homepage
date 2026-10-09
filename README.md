# A FAIR Studio - Game Studio Website

<div align="center">

⚖️ **Tipping the scales of gameplay.**

An indie game studio website built with Express.js, EJS, and Tailwind CSS.

</div>

---

## 🎮 About A FAIR Studio

A FAIR Studio is an indie game development team from Surabaya, Indonesia, born from a college project. Our name represents our five founding members, and our logo—the scale—is our guide. We exist to create balanced, engaging, and fun experiences together.

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js
- **Templating:** EJS (Embedded JavaScript)
- **Styling:** Tailwind CSS 3.x
- **Deployment:** Vercel (Serverless)

## 📁 Project Structure

```
AFAIRStudio-Homepage/
├── app.js                 # Express server & routes
├── content/               # Everything editable: games, awards, team
│   ├── awards.json
│   ├── team.json
│   └── games/
│       └── <game-id>/     # One folder per game (see "Adding a Game")
├── utils/
│   ├── content.js         # Reads the content folder
│   └── iconHelpers.js     # SVG icons
├── package.json           # Dependencies & scripts
├── tailwind.config.js     # Tailwind configuration
├── vercel.json            # Vercel deployment config
├── public/
│   ├── images/            # Studio logos and team photos
│   └── css/
│       ├── input.css      # Tailwind source file
│       └── output.css     # Compiled CSS (generated)
└── views/
    ├── partials/
    │   ├── header.ejs     # Navigation & head
    │   └── footer.ejs     # Footer & social links
    ├── games/
    │   ├── index.ejs      # Games gallery
    │   └── show.ejs       # Individual game page
    ├── legal/
    │   ├── privacy.ejs    # Privacy policy
    │   └── tos.ejs        # Terms of service
    ├── index.ejs          # Home page
    ├── about.ejs          # About us
    └── contact.ejs        # Contact page
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rayakeren/AFAIRStudio-Homepage.git
   cd AFAIRStudio-Homepage
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build Tailwind CSS**

   ```bash
   npm run build:css
   ```

   For development (watch mode):

   ```bash
   # Run in a separate terminal
   npm run build:css
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Or for production:

   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎮 Adding a Game

No code changes needed. Create a folder in `content/games/`; the folder name becomes the URL (`/games/<folder-name>`).

```
content/games/my-game/
├── game.json        # Text and links (required)
├── banner.jpg       # Full-width header image
├── logo.png         # Optional title art over the banner (falls back to the title as text)
├── thumb.jpg        # Card image on the home and games pages
├── feature.jpg      # Image beside the features list
└── screenshots/     # Any number of images, shown in filename order
    ├── 01-main-menu.jpg   # Caption becomes "Main Menu"
    └── 02.jpg             # No name: gets a generic caption
```

Missing images fall back to the banner or the first screenshot. `game.json`:

```json
{
  "title": "My Game",
  "order": 6,
  "featured": false,
  "genre": "Puzzle Platformer",
  "description": "One or two sentences for cards and link previews.",
  "about": "Longer text for the game page.",
  "features": ["First feature", "Second feature"],
  "trailerId": "YouTube video ID (optional)",
  "platforms": [
    { "name": "itch.io", "url": "https://a-fair-studio.itch.io/my-game", "icon": "itch" }
  ],
  "demo": { "embedUrl": "https://itch.io/embed-upload/123456", "mobileCompatible": false },
  "rating": "optional",
  "players": "1 Player",
  "releaseDate": "In development",
  "updateNotesUrl": "optional"
}
```

`order` sets the position in listings, and one game should have `"featured": true` for the home page. Icon names are listed in `utils/iconHelpers.js`.

## 🏆 Adding an Award

Add an entry to `content/awards.json`. The badge is drawn by the site, so no image is needed. `game` is the game's folder name; the badge then appears on that game's page as well as on the About page.

```json
{ "title": "1st Place", "event": "Event Name", "year": 2026, "game": "my-game" }
```

## 📜 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm run build:css` - Build Tailwind CSS (watch mode)

## 🌐 Pages

- **/** - Home page with featured game and studio intro
- **/about** - Studio story, awards and team
- **/games** - All games gallery
- **/games/:gameId** - Individual game page with embedded player
- **/contact** - Contact form and social links
- **/privacy** - Privacy policy
- **/tos** - Terms of service

## 🎨 Brand Colors

- **Purple:** `#6B4FA0` (brand-purple)
- **Gold:** `#FDB81E` (brand-gold)

## 📦 Deployment

This project is configured for Vercel serverless deployment:

1. **Install Vercel CLI** (optional)

   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

The `vercel.json` configuration handles the Express app as a serverless function.

## 🎯 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark theme with purple & gold accents
- ✅ Sticky navigation
- ✅ Games database with dynamic routing
- ✅ 16:9 responsive iframe containers for game embeds
- ✅ Newsletter signup form
- ✅ Social media integration
- ✅ SEO-friendly structure

## 📝 License

This project is private and not licensed for public use.

---

<div align="center">

Made with ❤️ by A FAIR Studio

Surabaya, Indonesia

</div>
