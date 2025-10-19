const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 9091 });

const rooms = {};

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
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    const { type, gameId, playerId, square } = message;

    switch (type) {
      case "JOIN": {
        if (!gameId || !playerId) return;

        if (!rooms[gameId]) {
          rooms[gameId] = {
            players: [],
            board: Array(25).fill(0),
          };
        }

        const room = rooms[gameId];
        if (
          room.players.length < 2 &&
          !room.players.some((p) => p.playerId === playerId)
        ) {
          room.players.push({ playerId, ws });

          if (room.players.length === 2) {
            room.players[0].ws.send(
              JSON.stringify({
                type: "PLAYER_ASSIGNED",
                player: "ODD",
                board: room.board,
              }),
            );
            room.players[1].ws.send(
              JSON.stringify({
                type: "PLAYER_ASSIGNED",
                player: "EVEN",
                board: room.board,
              }),
            );
          }
        }
        break;
      }

      case "INCREMENT": {
        const room = rooms[gameId];
        if (room && room.players.length === 2) {
          room.board[square]++;
          const winner = checkWinner(room.board);

          const updateMessage = JSON.stringify({
            type: "UPDATE",
            square,
            value: room.board[square],
          });
          room.players.forEach((p) => p.ws.send(updateMessage));

          if (winner) {
            const gameOverMessage = JSON.stringify({
              type: "GAME_OVER",
              winner,
            });
            room.players.forEach((p) => p.ws.send(gameOverMessage));
          }
        }
        break;
      }

      case "RESTART": {
        const room = rooms[gameId];
        if (room) {
          room.board = Array(25).fill(0);
          if (room.players.length === 2) {
            room.players[0].ws.send(
              JSON.stringify({
                type: "PLAYER_ASSIGNED",
                player: "ODD",
                board: room.board,
              }),
            );
            room.players[1].ws.send(
              JSON.stringify({
                type: "PLAYER_ASSIGNED",
                player: "EVEN",
                board: room.board,
              }),
            );
          }
        }
        break;
      }
    }
  });

  ws.on("close", () => {
    for (const gameId in rooms) {
      const room = rooms[gameId];
      const playerIndex = room.players.findIndex((p) => p.ws === ws);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        // Notify other player of disconnection
        if (room.players.length > 0) {
          room.players[0].ws.send(
            JSON.stringify({ type: "ERROR", message: "Opponent disconnected" }),
          );
        }
        break;
      }
    }
  });
});

console.log("WebSocket server started on port 8081");
