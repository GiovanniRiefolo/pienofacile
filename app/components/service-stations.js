"use client";

import { useContext, useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { SearchInputs } from "./search-inputs";
import styles from "../app.module.css";

const Map = dynamic(() => import("../components/map.js"), { ssr: false });

const isMainFuel = (name) => {
  const n = name.toLowerCase();
  return n.includes("benzina") || n.includes("gasolio");
};

const BRAND_DOMAINS = {
  eni: "eni.com",
  agip: "eni.com",
  q8: "q8.it",
  shell: "shell.com",
  total: "totalenergies.com",
  ip: "ip.it",
  erg: "erg.eu",
  tamoil: "tamoil.it",
  api: "api.it",
  esso: "esso.it",
  beyfin: "beyfin.it",
  kuwait: "q8.it",
};

const getBrandLogoUrl = (brand) => {
  if (!brand) return null;
  const key = brand.toLowerCase();
  for (const [name, domain] of Object.entries(BRAND_DOMAINS)) {
    if (key.includes(name)) {
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
  }
  return null;
};

export const ServiceStations = () => {
  const { serviceStationsList, loadingServiceStations } = useContext(ServiceStationsContext);
  const [activeFuel, setActiveFuel] = useState(null);

  useEffect(() => {
    setActiveFuel(null);
  }, [serviceStationsList]);

  const openToGMaps = (lat, lng) => {
    if (typeof window === "undefined") return;
    window.open(
      `https://maps.google.com/?q=${lat},${lng}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const fuelTypes = useMemo(() => {
    if (!serviceStationsList) return [];
    const types = new Set();
    serviceStationsList.forEach(station => {
      station.fuels?.forEach(fuel => types.add(fuel.name));
    });
    return Array.from(types).sort();
  }, [serviceStationsList]);

  const mainFuels = useMemo(() => fuelTypes.filter(isMainFuel), [fuelTypes]);
  const otherFuels = useMemo(() => fuelTypes.filter(f => !isMainFuel(f)), [fuelTypes]);

  const filteredStations = useMemo(() => {
    if (!activeFuel || !serviceStationsList) return serviceStationsList || [];
    return serviceStationsList.filter(station =>
      station.fuels?.some(fuel => fuel.name === activeFuel)
    );
  }, [serviceStationsList, activeFuel]);

  const bestStationId = useMemo(() => {
    if (!filteredStations || filteredStations.length === 0) return null;
    let bestId = null;
    let bestPrice = Infinity;
    filteredStations.forEach(station => {
      const relevantFuels = activeFuel
        ? station.fuels?.filter(f => f.name === activeFuel)
        : station.fuels;
      relevantFuels?.forEach(fuel => {
        const price = Math.min(
          fuel.prices?.served ?? Infinity,
          fuel.prices?.self ?? Infinity
        );
        if (price < bestPrice) {
          bestPrice = price;
          bestId = station.id;
        }
      });
    });
    return bestId;
  }, [filteredStations, activeFuel]);

  const sortedStations = useMemo(() => {
    if (!filteredStations || !bestStationId) return filteredStations;
    const best = filteredStations.find(s => s.id === bestStationId);
    const rest = filteredStations.filter(s => s.id !== bestStationId);
    return best ? [best, ...rest] : filteredStations;
  }, [filteredStations, bestStationId]);

  const isAltroActive = activeFuel != null && otherFuels.includes(activeFuel);

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
          <>
            {fuelTypes.length > 0 && (
              <div className={styles.fuelFilter}>
                <button
                  type="button"
                  className={`${styles.fuelFilterBtn} ${!activeFuel ? styles.fuelFilterBtnActive : ""}`}
                  onClick={() => setActiveFuel(null)}
                >
                  Tutti
                </button>
                {mainFuels.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.fuelFilterBtn} ${activeFuel === type ? styles.fuelFilterBtnActive : ""}`}
                    onClick={() => setActiveFuel(type)}
                  >
                    {type}
                  </button>
                ))}
                {otherFuels.length > 0 && (
                  <div className={`${styles.fuelFilterAltro} ${isAltroActive ? styles.fuelFilterAltroActive : ""}`}>
                    <span className={styles.fuelFilterAltroLabel}>Altro</span>
                    <select
                      className={styles.fuelFilterAltroSelect}
                      value={isAltroActive ? activeFuel : ""}
                      onChange={e => setActiveFuel(e.target.value || null)}
                    >
                      <option value="">—</option>
                      {otherFuels.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}
                {activeFuel != null && (
                  <button
                    type="button"
                    className={styles.fuelFilterReset}
                    onClick={() => setActiveFuel(null)}
                  >
                    ✕ Azzera
                  </button>
                )}
              </div>
            )}

            <ul className={styles.stationCards}>
              {sortedStations.map((station) => {
                const hasLocation =
                  station?.location?.lat != null && station?.location?.lng != null;
                const isBest = station.id === bestStationId;
                const displayFuels = activeFuel
                  ? station.fuels?.filter(f => f.name === activeFuel)
                  : station.fuels;
                const brandLogoUrl = getBrandLogoUrl(station.brand);

                return (
                  <li key={station.id} className={styles.stationCardsItem}>
                    <article className={`${styles.stationCard} ${isBest ? styles.stationCardBest : ""}`}>
                      <header className={styles.stationHeader}>
                        <div className={styles.stationHeaderTop}>
                          <h3 className={styles.stationTitle}>{station.name}</h3>
                          <div className={styles.stationHeaderBadges}>
                            {isBest && (
                              <span className={styles.bestBadge}>Miglior prezzo</span>
                            )}
                            {station.distance != null && (
                              <span className={styles.stationDistance}>
                                {Number(station.distance).toFixed(2)} km
                              </span>
                            )}
                          </div>
                        </div>

                        <p className={styles.stationSubtitle}>
                          {brandLogoUrl && (
                            <img
                              src={brandLogoUrl}
                              alt=""
                              className={styles.brandLogo}
                              onError={e => { e.target.style.display = "none"; }}
                            />
                          )}
                          {station.brand}
                        </p>
                      </header>

                      {displayFuels && displayFuels.length > 0 && (
                        <table className={styles.stationFuelTable}>
                          <thead>
                            <tr>
                              <th>Carburante</th>
                              <th>Servito</th>
                              <th>Self</th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayFuels.map((fuel, index) => (
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
                        <p className={styles.stationMeta}>
                          Aggiornato:{" "}
                          {station.insertDate
                            ? new Date(station.insertDate).toLocaleDateString()
                            : "-"}
                        </p>
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
          </>
        )}
      </section>
    </main>
  );
};
