import { useContext, useEffect } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../leaflet-theme.css";
import styles from "../app.module.css";

function MapAutoCenter({ center, zoom }) {
  const map = useMap();

  const lat = Array.isArray(center) ? center[0] : null;
  const lng = Array.isArray(center) ? center[1] : null;

  useEffect(() => {
    if (lat == null || lng == null) return;
    map.setView([lat, lng], zoom, { animate: true });
  }, [map, lat, lng, zoom]);

  return null;
}

export default function Map() {
  const { serviceStationsList, position, setPosition } = useContext(
    ServiceStationsContext
  );

  const positionIcon = L.icon({
    iconUrl: "/marker-position.png",
    iconSize: [40, 54],
    iconAnchor: [8, 0],
    popupAnchor: [14, -12],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [76, 54],
  });

  const stationIcon = L.icon({
    iconUrl: "/marker-station.png",
    iconSize: [22, 30],
    iconAnchor: [8, 16],
    popupAnchor: [1, -28],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [40, 32],
  });

    useEffect(() => {
        if (!position) {
            navigator.geolocation.getCurrentPosition((currentPosition) => {
                setPosition([
                    currentPosition.coords.latitude,
                    currentPosition.coords.longitude,
                ]);
            });
        }
    }, [position, setPosition]);


  return (
    <>
      {!position && <div className={styles.mapSkeleton} />}
      {position && (
        <section className={styles.mapSection}>
          <MapContainer center={position} zoom={13} className={styles.mapCanvas}>
            <MapAutoCenter center={position} zoom={13} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={position} icon={positionIcon}>
              <Popup>Posizione selezionata</Popup>
            </Marker>

            {serviceStationsList &&
              serviceStationsList.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.location.lat, station.location.lng]}
                  icon={stationIcon}
                >
                  <Popup>
                    <div>
                      <strong>{station.name}</strong>
                      <div>
                        {station.brand}
                        {station.distance != null && (
                          <> · {station.distance.toFixed(2)} km</>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </section>
      )}
    </>
  );
}
