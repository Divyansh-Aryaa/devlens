# GitHub Profile Analyzer

A Next.js 14 application that allows you to analyze any GitHub profile. It fetches data directly from the GitHub API using Next.js Server Components, completely avoiding the need for an external backend.

## Features
- Search for any GitHub username
- View elegant User Profile Cards (avatar, bio, followers/following stats)
- See the Top 5 Repositories sorted by stars
- Interactive bar chart showing the user's top programming languages, powered by Recharts
- Loading Skeletons for smooth transitions
- Clean, responsive UI built with Tailwind CSS

## Folder Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and custom Tailwind animation classes
│   ├── layout.tsx       # Root layout defining the font and base HTML structure
│   └── page.tsx         # Main application page, integrates Search and Dashboard
├── components/          # Reusable UI components
│   ├── LanguageChart.tsx # Recharts-based bar chart for language stats
│   ├── ProfileCard.tsx   # Displays user profile information
│   ├── RepoList.tsx      # Displays top repositories and badges
│   ├── SearchForm.tsx    # Client component for the search input
│   └── Skeletons.tsx     # Loading skeleton states
└── lib/
    ├── github.ts        # GitHub API fetching logic and TypeScript interfaces
    └── utils.ts         # Utility functions (e.g., Tailwind class merging)
```

## Running the Project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
