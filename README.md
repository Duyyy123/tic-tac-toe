
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

# Upgrade to Online Multiplayer: Odd/Even Tic-Tac-Toe

This document outlines the necessary changes to refactor the existing Tic-Tac-Toe application into a real-time, online multiplayer game based on the "Odd/Even" rules.

## Core Concepts

The new implementation will be guided by two main principles from the assignment:

1.  **Server Authority:** The server will be the single source of truth for the game state. The client will only send player actions (increments) and render the state provided by the server.
2.  **Operational Transforms:** The client will send *operations* (e.g., `INCREMENT`) rather than final states. This allows the server to correctly handle simultaneous actions from multiple players without conflicts.

---

## File-by-File Changes

### 1. `index.html`

*   **What:** Change the title of the application.
*   **How:** Replace `<title>Vite + React + TS</title>` with `<title>Odd/Even Tic-Tac-Toe</title>`.
*   **Why:** To accurately reflect the new game.
*   **Expected:** The browser tab will show the new title.
*   **Requirement:** General usability.

### 2. `vite.config.ts`

*   **What:** Remove the `base` property.
*   **How:** Delete the line `base: "/tic-tac-toe/"`.
*   **Why:** The previous `base` setting was for GitHub Pages deployment. For local development with a WebSocket server, this is not needed and can cause issues.
*   **Expected:** The application will be served from the root of the domain.
*   **Requirement:** Proper local development setup.

### 3. `src/features/tic-tac-toe/types/index.ts`

*   **What:** Update the type definitions to match the new game rules.
*   **How:**
    *   Change `SquareValue` from `"X" | "O" | null` to `number`.
    *   Change `GameMode` to `Player`, representing the player's role: `export type Player = "ODD" | "EVEN";`.
    *   Remove `BotDifficulty`.
*   **Why:** To align the client-side types with the new game logic (numeric board, Odd/Even players).
*   **Expected:** The TypeScript compiler will enforce the new data structures.
*   **Requirement:** Core game rules.

### 4. `src/features/tic-tac-toe/hooks/useGame.ts`

*   **What:** This hook will be completely rewritten to manage the WebSocket connection and the online game state.
*   **How:**
    *   Remove the existing logic for turn-based play, local win detection, and bot interaction.
    *   Introduce state for the WebSocket connection, player role, connection status, and game over state:
        ```typescript
        const [ws, setWs] = useState<WebSocket | null>(null);
        const [player, setPlayer] = useState<Player | null>(null);
        const [board, setBoard] = useState<number[]>(Array(25).fill(0));
        const [status, setStatus] = useState('Connecting...');
        const [winner, setWinner] = useState<Player | null>(null);
        ```
    *   Use a `useEffect` hook to establish the WebSocket connection on component mount.
    *   Implement the `onmessage` handler to process messages from the server (`PLAYER_ASSIGNED`, `UPDATE`, `GAME_OVER`).
    *   The `handleClick` function will now only send an `INCREMENT` message through the WebSocket.
*   **Why:** This is the core of the client-side logic for the online game, implementing the "Server Authority" model.
*   **Expected:** The game will be driven by messages from the server, not local state changes.
*   **Requirement:** WebSocket Connection, Server Authority, Player Assignment, Game Over.

### 5. `src/features/tic-tac-toe/hooks/useBot.ts` & `lib/gameLogic.ts`

*   **What:** Delete these files.
*   **How:** `rm src/features/tic-tac-toe/hooks/useBot.ts src/features/tic-tac-toe/lib/gameLogic.ts`
*   **Why:** The bot logic and client-side win detection are no longer needed in the new multiplayer architecture.
*   **Expected:** A cleaner codebase with no dead code.
*   **Requirement:** Adherence to the server-authoritative model.

### 6. Component Updates

*   **`App.tsx`:**
    *   **What:** Simplify the main component and add a "Game Over" overlay.
    *   **How:** Remove the `ModeSelector`. The main component will now just render the board and game info. A conditional overlay will be shown when `winner` is not null.
    *   **Why:** To adapt the UI to the new single-mode (online) game and to display the final game result.
    *   **Expected:** A cleaner UI that shows the game board and a "Game Over" message when the game ends.
    *   **Requirement:** Game Over display.

*   **`Board.tsx`:**
    *   **What:** Change the board to a 5x5 grid.
    *   **How:** Update the inline style or CSS class for the board grid to have 5 columns. The component will now receive a `number[]` for the `squares` prop.
    *   **Why:** To match the new game rules.
    *   **Expected:** A 5x5 game board will be rendered.
    *   **Requirement:** 5x5 Game Board.

*   **`Square.tsx`:**
    *   **What:** Display the numeric value of the square.
    *   **How:** The component will now render the `value` prop, which is a `number`.
    *   **Why:** To show the current number on each square as per the game rules.
    *   **Expected:** Each square will display a number (0, 1, 2, ...).
    *   **Requirement:** Display current board state.

*   **`GameInfo.tsx`:**
    *   **What:** Display the player's role and the connection status.
    *   **How:** The component will now receive `player` and `status` props and display messages like "You are the ODD player" and "Status: Connected".
    *   **Why:** To provide necessary information to the player.
    *   **Expected:** The player will know their role and the status of the game connection.
    *   **Requirement:** Clear visual indication of player and connection status.

*   **`ModeSelector.tsx`:**
    *   **What:** Delete this component.
    *   **How:** `rm src/features/tic-tac-toe/components/ModeSelector.tsx`
    *   **Why:** The game is now only multiplayer online, so there is no need to select a mode.
    *   **Expected:** A simpler UI.
    *   **Requirement:** The assignment is for a multiplayer game.

### 7. `src/styles/globals.css`

*   **What:** Add styles for the "Game Over" overlay.
*   **How:** Add CSS for a semi-transparent overlay and a message box to announce the winner.
*   **Why:** To provide a clear and visually appealing "Game Over" screen.
*   **Expected:** A modal or overlay will appear when the game ends.
*   **Requirement:** Game Over display.

---

This plan covers all the requirements of the assignment and will result in a fully functional online multiplayer Odd/Even Tic-Tac-Toe game.
