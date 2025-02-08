# Vue 3 SSR Project

This project uses Vue 3 with Vite SSR, Tailwind v4, and Supabase for authentication and data storage.

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- Supabase account

## Installation

````bash
# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env
```json

## Environment Variables

Create a `.env` file with:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_api_url
```json

## Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Lint and fix files
npm run lint
````

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Start SSR server
npm run serve:ssr
```

## Project Structure

```md
src/
├── components/ # Reusable Vue components
├── composables/ # Vue composable hooks
├── router/ # Vue Router configuration
├── stores/ # Pinia state management
├── views/ # Page components
└── ... # Other configuration files
```

## Features

- Vue 3 + Vite + TypeScript
- Server-Side Rendering
- Tailwind v4 for styling
- Supabase Authentication
- Pinia for state management
- Vue Router for navigation

## Testing

> **Note:** Testing setup is pending. We plan to implement:

- Unit tests with Vitest
- Component tests with Vue Test Utils
- E2E tests with Cypress

To set up testing, run:

```bash
# Install testing dependencies
npm install -D vitest @vue/test-utils cypress
```

## Deployment

The application can be deployed to various platforms. Here's a guide for Vercel deployment:

1. Build the application:

```bash
npm run build
```

1. Install Vercel CLI:

```bash
npm i -g vercel
```

1. Deploy to Vercel:

```bash
# First-time deployment
vercel

# Subsequent deployments
vercel --prod
```

### Vercel Configuration

Create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## License

This project is MIT licensed.
