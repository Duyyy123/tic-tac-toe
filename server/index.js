const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 9091 });

let waitingPlayer = null;
let nextGameId = 1;

const checkWinner = (board) => {
  const lines = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  for (const line of lines) {
    const values = line.map((i) => board[i]);
    if (values.every((v) => v > 0 && v % 2 === 1)) return "ODD";
    if (values.every((v) => v > 0 && v % 2 === 0)) return "EVEN";
  }

  return null;
};

server.on("connection", (ws) => {
  console.log("Player connected");

  if (waitingPlayer) {
    const gameId = nextGameId++;
    const players = [
      { ws: waitingPlayer, player: "ODD" },
      { ws: ws, player: "EVEN" },
    ];
    const game = {
      id: gameId,
      players: players,
      board: Array(25).fill(0),
    };
    waitingPlayer.game = game;
    ws.game = game;

    waitingPlayer = null;

    console.log(`Game ${gameId} started`);

    players.forEach((p) => {
      p.ws.send(
        JSON.stringify({
          type: "PLAYER_ASSIGNED",
          player: p.player,
          board: game.board,
          gameId: game.id,
        }),
      );
    });
  } else {
    waitingPlayer = ws;
    console.log("Player waiting");
    ws.send(JSON.stringify({ type: "STATUS", message: "Waiting for an opponent..." }));
  }

  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    const { type, square } = message;
    const game = ws.game;

    if (!game) {
      return;
    }

    switch (type) {
      case "INCREMENT": {
        if (game.players.length === 2) {
          game.board[square]++;
          const winner = checkWinner(game.board);

          const updateMessage = JSON.stringify({
            type: "UPDATE",
            square,
            value: game.board[square],
          });
          game.players.forEach((p) => p.ws.send(updateMessage));

          if (winner) {
            const gameOverMessage = JSON.stringify({
              type: "GAME_OVER",
              winner,
            });
            game.players.forEach((p) => p.ws.send(gameOverMessage));
          }
        }
        break;
      }

      case "RESTART": {
        game.board = Array(25).fill(0);
        const restartMessage = JSON.stringify({
          type: "RESTARTED",
          board: game.board,
        });
        game.players.forEach((p) => p.ws.send(restartMessage));
        break;
      }
    }
  });

  ws.on("close", () => {
    console.log("Player disconnected");
    if (ws === waitingPlayer) {
      waitingPlayer = null;
      console.log("Waiting player disconnected");
      return;
    }

    const game = ws.game;
    if (game) {
      const otherPlayer = game.players.find((p) => p.ws !== ws);
      if (otherPlayer && otherPlayer.ws.readyState === WebSocket.OPEN) {
        otherPlayer.ws.send(
          JSON.stringify({ type: "ERROR", message: "Opponent disconnected. The game is over." }),
        );
      }
      game.players.forEach((p) => {
        if (p.ws.game) {
          p.ws.game = null;
        }
      });
    }
  });
});

console.log("WebSocket server started on port 9091");