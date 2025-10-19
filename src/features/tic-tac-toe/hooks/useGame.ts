import { useState, useEffect } from "react";
import { Player } from "../types";

const WS_URL = "ws://localhost:9091";

export const useGame = (gameId: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [board, setBoard] = useState<number[]>(Array(25).fill(0));
  const [status, setStatus] = useState("Connecting...");
  const [winner, setWinner] = useState<Player | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      const playerId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("playerId="))
        ?.split("=")[1];
      ws.send(JSON.stringify({ type: "JOIN", gameId, playerId }));
      setStatus("Waiting for opponent...");
      setWs(ws);
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case "PLAYER_ASSIGNED":
          setPlayer(message.player);
          setBoard(message.board);
          setStatus("Connected");
          break;
        case "UPDATE":
          setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[message.square] = message.value;
            return newBoard;
          });
          break;
        case "GAME_OVER":
          setWinner(message.winner);
          break;
        case "ERROR":
          setStatus(message.message);
          break;
      }
    };

    ws.onclose = () => {
      setStatus("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, [gameId]);

  const handleClick = (i: number) => {
    if (ws && winner === null) {
      ws.send(JSON.stringify({ type: "INCREMENT", gameId, square: i }));
    }
  };

  const handleRestart = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: "RESTART", gameId }));
      setWinner(null);
    }
  };

  return { player, board, status, winner, handleClick, handleRestart };
};
