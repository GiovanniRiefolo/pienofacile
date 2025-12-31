"use client";

import { useState, useContext, useEffect } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { Map } from "../components/map.js";
import { Slider } from "primereact/slider";

export const ServiceStations = () => {
  const { serviceStationsList, setServiceStationsList, position, setPosition } =
    useContext(ServiceStationsContext);
  const [radius, setRadius] = useState(5);
  const [address, setAddress] = useState("");

  const getServiceStations = () => {
    fetch("api/zone", {
      method: "POST",
      body: JSON.stringify({
        points: [{ lat: position[0], lng: position[1] }],
        radius: radius,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200)
          setServiceStationsList(response.data.results);
      });
  };

  return (
    <>
      <section>
        <label>Indirizzo</label>
        <input
          type="search"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="button">Cerca</button>
      </section>

      <Map />
      <label>Distanza {radius ? radius : "0"} Km</label>
      <Slider
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        htmlId="radius"
        min="0"
        max="10"
      />

      <button onClick={() => getServiceStations()}>cerca</button>
      <ul>
        {serviceStationsList &&
          serviceStationsList.map((station) => (
            <li key={station.id}>
              {station.name}
              {station.brand && station.brand !== station.name && (
                <> - ({station.brand})</>
              )}
              <table>
                <thead>
                  <td>Carburante</td>
                  <td>Prezzo</td>
                  <td>Self</td>
                </thead>
                <tbody>
                  {station.fuels.map((fuel) => (
                    <tr>
                      <td>{fuel.name}</td>
                      <td>{fuel.price}</td>
                      <td>{fuel.isSelf ? "Si" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {station.insertDate}
            </li>
          ))}
      </ul>
    </>
  );
};
