import React from "react";
import { SocketProvider } from "./context/SocketContext";
import Home from "./pages/Home";

export const BandNamesApp = () => {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};
