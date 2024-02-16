import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  const cambioNombre = (event, id) => {
    const newName = event.target.value;
    setBands((bandas) =>
      bandas.map((banda) => {
        if (banda.id === id) {
          banda.name = newName;
        }
        return banda;
      })
    );
  };

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const onBlur = (id, name) => {
    socket.emit("cambiar-xnombre-banda", {
      id,
      nombre: name,
    });
  };

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(event) => cambioNombre(event, band.id)}
            onBlur={() => onBlur(band.id, band.name)}
          />
        </td>
        <td>
          <h1>{band.votes}</h1>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
        <td></td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
