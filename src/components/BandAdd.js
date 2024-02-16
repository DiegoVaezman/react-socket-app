import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const { socket } = useContext(SocketContext);
  const [value, setValue] = useState("");

  const agregarBanda = ({ nombre }) => {
    socket.emit("agregar-banda", {
      nombre,
    });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (value.trim().length > 0) {
      agregarBanda({ nombre: value });
      setValue("");
    }
  };
  return (
    <>
      <h2>Agregar Banda</h2>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
        />
      </form>
    </>
  );
};
