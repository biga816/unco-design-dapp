# unco-design-dapp

This project is for recording your Unco in a distributed network.
Unco, which mean the solid or semisolid remains of the food that could not be digested in the small intestine,are called feces (or poo) in english.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deployment to Firebase

This project is configured for static hosting on Firebase.

### Prerequisites

1. Login to Firebase:

```bash
npx firebase login
```

### Deploy Steps

1. Build the project:

```bash
npm run build
```

2. Export static files:

```bash
npm run export
```

This will create an `out` directory with static HTML/CSS/JS files.

3. Deploy to Firebase Hosting:

```bash
npm run deploy
```

### Configuration

- **Firebase Project**: `unco-design` (configured in `.firebaserc`)
- **Public Directory**: `out` (configured in `firebase.json`)
- **Build Output**: Static export (configured in `next.config.js`)

### Notes

- The project uses Next.js static export mode (`output: 'export'`)
- Image optimization is disabled for static hosting compatibility
- All routes are pre-rendered at build time
