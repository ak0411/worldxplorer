## WorldXplorer

WorldXplorer is an app for exploring the world from the comfort of your screen! Visit random locations via Google Street View or discover specific places with queries.

Visit the live app at: https://worldxplorer.vercel.app/.

## Features
- **Random Exploration**: Discover random locations on the map using Google Street View.
- **Query Search**: Use Overpass QL queries to explore specific places with customized filters.

## Tech Stack
- **Next.js with TypeScript**: A full-stack framework for building React applications.
- **Tailwind CSS**: For responsive, utility-first styling.
- **shadcn/ui**: Streamlines component styling with Tailwind.
- **Zustand**: Simple, lightweight state management for React.
- **Google Maps Embed API**: Powers Street View.
- **React Leaflet**: Enables map interactivity for dynamic and detailed map exploration.

## Run Locally

To run this app locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/ak0411/worldxplorer.git
cd worldxplorer
```

### 2. Install Dependencies
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 3. Set Up Environment Variables
Create a .env.local file in the root of your project and add your API keys. The app requires:

```plaintext
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Run the Development Server
```bash
npm run dev
Open http://localhost:3000 in your browser to view the app.
```

Open http://localhost:3000 in your browser to view the app.

## Acknowledgments
The random latitude and longitude generation functionality in this project is inspired by [worldguessr](https://github.com/codergautam/worldguessr) by [codergautam](https://github.com/codergautam).
