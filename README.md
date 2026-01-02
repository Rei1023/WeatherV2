# Taiwan Glass Weather V2

A weather application built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm

### Installation

Install the project dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### Automatic Deployment

This project is configured with GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment

You can also manually deploy using the `gh-pages` package:

```bash
npm run deploy
```

Make sure your `package.json` `homepage` field is correctly set to your GitHub Pages URL: `https://<username>.github.io/<repo-name>`.
