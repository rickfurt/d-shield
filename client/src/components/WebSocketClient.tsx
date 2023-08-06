"use client";
import React, { useEffect, useState } from "react";

type Props = {
  onDataReceived: Function;
};
import { useStore } from "@/helpers/useStore";

// @ts-ignore
const WebSocketClient = ({ onDataReceived }) => {
  const { socket, setSocket } = useStore();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    setSocket(ws);

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log("RECEIVED A MESSAGE ---> ", data);
      onDataReceived(data);
    });

    return () => {
      console.log("CLOSE CONNECTION --------------");
      ws.close();
    };
  }, []);

  const sendMessage = (message: any) => {
    socket?.send(JSON.stringify(message));
  };

  return { sendMessage };
};

export default WebSocketClient;
