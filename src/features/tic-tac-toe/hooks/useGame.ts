import { useState, useEffect, useRef } from "react";
import { Player } from "../types";

const WS_URL = "ws://localhost:9091";

export const useGame = () => {
  const ws = useRef<WebSocket | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [board, setBoard] = useState<number[]>(Array(25).fill(0));
  const [status, setStatus] = useState("Connecting...");
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    ws.current = socket;

    socket.onopen = () => {
      setStatus("Connecting to server...");
    };

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      switch (message.type) {
        case "STATUS":
          setStatus(message.message);
          break;
        case "PLAYER_ASSIGNED":
          setPlayer(message.player);
          setBoard(message.board);
          setGameId(message.gameId);
          setStatus("Game started!");
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
        case "RESTARTED":
          setBoard(message.board);
          setWinner(null);
          setStatus("Game restarted!");
          break;
      }
    };

    socket.onclose = () => {
      setStatus("Disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleClick = (i: number) => {
    if (ws.current && winner === null) {
      ws.current.send(JSON.stringify({ type: "INCREMENT", square: i }));
    }
  };

  const handleRestart = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: "RESTART" }));
    }
  };

  return { player, board, status, winner, gameId, handleClick, handleRestart };
};