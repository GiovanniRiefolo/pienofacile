"use client";

import { useState, useContext } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const positionIcon = L.icon({
  iconUrl: "/marker@2x.png",
  iconSize: [40, 54], // dimensioni tipiche dei marker Leaflet
  iconAnchor: [8, 0], // punto dove il marker è "ancorato"
  popupAnchor: [14, -12], // posizione relativa del popup
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [76, 54],
});

const stationIcon = L.icon({
  iconUrl: "/marker.png",
  iconSize: [22, 30], // dimensioni tipiche dei marker Leaflet
  iconAnchor: [8, 16], // punto dove il marker è "ancorato"
  popupAnchor: [1, -28], // posizione relativa del popup
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [40, 32],
});

export const ServiceStations = () => {
  const { serviceStationsList, setServiceStationsList } = useContext(
    ServiceStationsContext
  );
  const [radius, setRadius] = useState(5);
  const [position, setPosition] = useState([45.0703155, 7.6868552]);

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
      <MapContainer center={position} zoom={13} style={{ height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={positionIcon}>
          <Popup>A popup message on the marker.</Popup>
        </Marker>

        {serviceStationsList &&
          serviceStationsList.map((station) => (
            <Marker
              key={station.id}
              position={[station.location.lat, station.location.lng]}
              icon={stationIcon}
            >
              <Popup>
                {station.name}
                {station.brand && station.brand !== station.name && (
                  <> - ({station.brand})</>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <input
        type="range"
        id="radius"
        min="0"
        max="10"
        onChange={(e) => setRadius(e.target.value)}
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
            </li>
          ))}
      </ul>
    </>
  );
};
