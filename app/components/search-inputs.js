"use client";

import { useContext, useRef, useState } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import styles from "../app.module.css";

export const SearchInputs = () => {
  const {
    address,
    setAddress,
    radius,
    setRadius,
    getServiceStations,
    geocodeLocation,
    loadingServiceStations,
  } = useContext(ServiceStationsContext);

  const [directAddress, setDirectAddress] = useState(false);
  const geocodeDebounceTimerRef = useRef(null);

  const handleGeocode = (value) => {
    setAddress(value);

    if (geocodeDebounceTimerRef.current) {
      clearTimeout(geocodeDebounceTimerRef.current);
    }

    // Debounce to avoid firing a request on every keystroke.
    geocodeDebounceTimerRef.current = setTimeout(() => {
      geocodeLocation(value);
    }, 450);
  };

  return (
    <form className={styles.search}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Pieno<span className={styles.title_alt}>Facile</span>
        </h1>

        <div className={styles.toggle}>
          <label htmlFor="directAddress">Indirizzo diretto</label>
          <input
            id="directAddress"
            type="checkbox"
            checked={directAddress}
            onChange={(e) => setDirectAddress(e.target.checked)}
          />
        </div>
      </header>

      {!directAddress && (
        <section className={styles.row}>
          <label htmlFor="radius" className={styles.label}>
            Distanza: <strong>{radius ?? 0} km</strong>
          </label>

          <input
            id="radius"
            type="range"
            min="0"
            max="10"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className={styles.range}
          />

          <button
            type="button"
            className={styles.button}
            onClick={getServiceStations}
            disabled={loadingServiceStations}
          >
            {loadingServiceStations ? "Caricamento…" : "Cerca"}
          </button>
        </section>
      )}

      {directAddress && (
        <section className={styles.row}>
          <label htmlFor="address" className={styles.label}>
            Indirizzo
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => handleGeocode(e.target.value)}
            className={styles.input}
          />

          <button
            type="button"
            className={styles.button}
            onClick={getServiceStations}
            disabled={loadingServiceStations}
          >
            {loadingServiceStations ? "Caricamento…" : "Cerca"}
          </button>
        </section>
      )}
    </form>
  );
};
