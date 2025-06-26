import { useState, useContext, useEffect } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export const Map = () => {
  const { serviceStationsList, position, setPosition } = useContext(ServiceStationsContext);
  const [geoData, setGeoData] = useState({});

  const positionIcon = L.icon({
    iconUrl: "/marker@2x.png",
    iconSize: [40, 54],
    iconAnchor: [8, 0],
    popupAnchor: [14, -12],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [76, 54],
  });
  
  const stationIcon = L.icon({
    iconUrl: "/marker.png",
    iconSize: [22, 30],
    iconAnchor: [8, 16],
    popupAnchor: [1, -28],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [40, 32],
  });
  
  const getGeolocalizationData = () => {
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      setPosition([currentPosition.coords.latitude, currentPosition.coords.longitude]);
    });
  }

  useEffect(() => {
    getGeolocalizationData() 
  }, [])


  return(
    <>
    {position && 
    <section className="map">
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
        </section>
    }
    </>
  )
};
