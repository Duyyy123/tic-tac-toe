
# Refactoring Documentation

This document details the refactoring process applied to the Tic-Tac-Toe project.

## New Folder Structure

The project has been restructured to group files by feature, improving modularity and scalability.

```
src/
├── app/
│   ├── App.tsx
│   └── main.tsx
├── features/
│   └── tic-tac-toe/
│       ├── components/
│       │   ├── Board.tsx
│       │   ├── Square.tsx
│       │   ├── GameInfo.tsx
│       │   └── ModeSelector.tsx
│       ├── hooks/
│       │   ├── useGame.ts
│       │   └── useBot.ts
│       ├── lib/
│       │   └── gameLogic.ts
│       └── types/
│           └── index.ts
├── shared/
│   ├── components/
│   │   ├── Label.tsx
│   │   └── RadioGroup.tsx
│   └── lib/
│       └── utils.ts
├── styles/
│   └── globals.css
└── vite-env.d.ts
```

## Changes Overview

### 1. Code Organization

- **Grouped by Feature:** Files are now organized by feature (`tic-tac-toe`) instead of file type. This makes it easier to locate and work on related files.
- **`shared` and `app` Directories:** A `shared` directory has been introduced for reusable components and utilities. The main application setup is now in the `app` directory.

### 2. TypeScript Conversion

- All `.jsx` files have been converted to `.tsx` to ensure type safety and consistency.
- Type definitions for the game state and props have been added in `src/features/tic-tac-toe/types/index.ts`.

### 3. Hook Refactoring

- The monolithic `useTicTacToe.jsx` hook has been split into two smaller, more focused hooks:
    - `useGame.ts`: Manages the core game state and logic.
    - `useBot.ts`: Encapsulates the bot's logic and behavior.

### 4. Styling

- CSS files have been consolidated into a single `globals.css` file in the `styles` directory.

### 5. Configuration

- The `vite.config.ts` file has been updated with a path alias (`@`) to simplify imports.

## How to Run the Project

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

This will start the Vite development server and you can view the application in your browser.
