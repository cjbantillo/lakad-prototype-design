# LAKAD Travel Itinerary Planner

A modern, interactive travel planning application built with React, TypeScript, and Tailwind CSS. Plan your trips, manage daily itineraries, and visualize your travel destinations.

## Features

- ✈️ Create and manage multiple trips
- 📅 Day-by-day itinerary builder with drag-and-drop
- 🗺️ Map view for trip locations
- 🎨 Beautiful UI with Radix UI components
- 📱 Responsive design for all devices
- 🔒 Local storage support (no backend required)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd "LAKAD prototype design"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Beautiful icon set
- **React DnD** - Drag and drop functionality
- **React Router** - Navigation

## Project Structure

```
LAKAD prototype design/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components (shadcn/ui)
│   │   └── figma/     # Image utilities
│   ├── guidelines/    # Design guidelines
│   ├── styles/        # Global styles
│   ├── types.ts       # TypeScript type definitions
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies

```

## Configuration

### Google Maps (Optional)

To enable the map view feature:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps Embed API
3. Update `src/components/MapView.tsx` and replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
