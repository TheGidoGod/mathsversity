# Mathsversity

Mathsversity is a playful, browser-based maths learning experience for learners in Classes 1-8. It combines short lessons, interactive activities, progress tracking, and a parent-friendly premium preview in one static website.

## What is included

- Student dashboard with learning streaks, energy hearts, progress cards, badges, and a quick fraction challenge.
- Class library covering Classes 1-8.
- 88 interactive maths tools across counting, arithmetic, fractions, geometry, algebra, graphs, probability, and statistics.
- Class-specific filters for browsing tools by topic.
- Responsive layouts for the dashboard, class pages, lesson pages, login, and premium plans.
- Light and dark themes with the selection saved in the browser.
- Local profile and progress state using `localStorage`.
- Optional local account registration and sign-in using browser-side AES-GCM encryption.
- Unlimited practice with the energy-heart display retained for progress feedback.

## Deploy with GitHub Pages

This project is ready to publish with GitHub Pages. It has no build step, package installation, or server-side code.

1. Create a GitHub repository and upload all project files to the repository root.
2. Make sure `index.html` is in the root of the default branch, usually `main`.
3. Open the repository on GitHub and go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait for GitHub to publish the site. The deployment URL will appear in the Pages settings.

The default URL is usually:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

For a user or organization site repository named `YOUR-USERNAME.github.io`, the URL is:

```text
https://YOUR-USERNAME.github.io/
```

All internal links use relative paths, so the site works when published from a repository subpath.

## Local preview

For local testing, open `index.html` directly or use any local web server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Main pages

| Page | File | Purpose |
| --- | --- | --- |
| Dashboard | `index.html` | Overview, progress, lessons, practice, and profile |
| Class library | `classes.html` | Browse all eight classes |
| Class pages | `class-1.html` through `class-8.html` | View topics and tools for a class |
| Tool pages | `tool-*-*.html` | Open an individual interactive activity |
| Account | `login.html` | Create or sign in to a local account |
| Premium | `premium.html` | View demo premium plans |

## Project structure

- `index.html`, `classes.html`, `class-*.html`, and `tool-*.html` contain the page templates.
- `styles.css`, `subpage.css`, `toolpage.css`, `login.css`, `premium.css`, and related files provide the visual system.
- `app.js` powers dashboard interactions.
- `subpage.js` contains class metadata and renders the class catalog and tool grids.
- `c1c2-tools.js`, `c3c4-tools.js`, `c5c6-tools.js`, and `c7c8-tools.js` power the interactive lesson activities.
- `auth.js` handles local account creation, sign-in, encryption, and CSV backup download.
- `user-system.js` manages the learner profile and dashboard progress state.
- `freemium.js` tracks practice attempts and keeps the energy-heart display available for future product changes.
- `theme.js` manages themes and loads optional activity libraries from CDNs.

## External libraries

Interactive tools may load these browser libraries from jsDelivr at runtime:

- p5.js
- MathJax
- canvas-confetti
- Howler.js
- Matter.js
- JSXGraph

An internet connection is needed for activities that use these CDN-hosted libraries. The site itself has no server-side API or database.

## Data and privacy

Profile, progress, theme, and freemium state are stored locally in the browser. Account records are encrypted with AES-GCM before being stored in `localStorage`; registration also downloads an encrypted CSV backup. No password is sent to a server by this static demo.

The premium page is retained as an unlinked future feature. It is not part of the current learning flow and no payments are processed.

## Browser support

Use a current version of Chrome, Edge, Firefox, or Safari with JavaScript enabled. A browser with Web Crypto support is required for account registration and sign-in.
