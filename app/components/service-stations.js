"use client";

import { useContext } from "react";
import dynamic from "next/dynamic";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { SearchInputs } from "./search-inputs";
import styles from "../app.module.css";

const Map = dynamic(() => import("../components/map.js"), { ssr: false });

export const ServiceStations = () => {
  const { serviceStationsList, loadingServiceStations } = useContext(ServiceStationsContext);

  const openToGMaps = (lat, lng) => {
    if (typeof window === "undefined") return;
    window.open(
      `https://maps.google.com/?q=${lat},${lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className={styles.page}>
      <SearchInputs />
      <Map />

      <section className={styles.stationsSection} aria-busy={loadingServiceStations}>
        {loadingServiceStations && (
          <p className={styles.stationsHint} aria-live="polite">
            Caricamento…
          </p>
        )}

        {!loadingServiceStations && (!serviceStationsList || serviceStationsList.length === 0) && (
          <p className={styles.stationsHint}>Nessun risultato.</p>
        )}

        {serviceStationsList && serviceStationsList.length > 0 && (
          <ul className={styles.stationCards}>
            {serviceStationsList.map((station) => {
              const hasLocation =
                station?.location?.lat != null && station?.location?.lng != null;

              return (
                <li key={station.id} className={styles.stationCardsItem}>
                  <article className={styles.stationCard}>
                    <header className={styles.stationHeader}>
                      <div className={styles.stationHeaderTop}>
                        <h3 className={styles.stationTitle}>{station.name}</h3>
                        {station.distance != null && (
                          <span className={styles.stationDistance}>
                            {Number(station.distance).toFixed(2)} km
                          </span>
                        )}
                      </div>

                      <p className={styles.stationSubtitle}>{station.brand}</p>

                      <p className={styles.stationMeta}>
                        Aggiornato:{" "}
                        {station.insertDate
                          ? new Date(station.insertDate).toLocaleDateString()
                          : "-"}
                      </p>
                    </header>

                    {station.fuels && station.fuels.length > 0 && (
                      <table className={styles.stationFuelTable}>
                        <thead>
                          <tr>
                            <th>Carburante</th>
                            <th>Servito</th>
                            <th>Self</th>
                          </tr>
                        </thead>
                        <tbody>
                          {station.fuels.map((fuel, index) => (
                            <tr key={`${station.id}-${fuel.name}-${index}`}>
                              <td className={styles.stationFuelNameCell}>{fuel.name}</td>
                              <td>{fuel.prices?.served ?? "-" }€</td>
                              <td>{fuel.prices?.self ?? "-" }€</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    <footer className={styles.stationFooter}>
                      <button
                        type="button"
                        className={styles.mapButton}
                        onClick={() => openToGMaps(station.location?.lat, station.location?.lng)}
                        disabled={!hasLocation}
                      >
                        Apri mappa
                      </button>
                    </footer>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};
