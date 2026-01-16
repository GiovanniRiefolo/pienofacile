"use client";

import { useContext, useRef } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import styles from "../app.module.css";

export const DirectAddressSearch = () => {
  const {
    address,
    setAddress,
    geocodeLocation,
    geocodeFeatures,
    selectGeocodeFeature,
    clearGeocodeResults,
    loadingServiceStations,
    getServiceStations,
  } = useContext(ServiceStationsContext);

  const geocodeDebounceTimerRef = useRef(null);

  const handleAddressChange = (value) => {
    setAddress(value);

    if (geocodeDebounceTimerRef.current) {
      clearTimeout(geocodeDebounceTimerRef.current);
    }

    // Debounce to avoid firing a request on every keystroke.
    geocodeDebounceTimerRef.current = setTimeout(() => {
      geocodeLocation(value);
    }, 450);
  };

  const isPanelOpen = Array.isArray(geocodeFeatures) && geocodeFeatures.length > 0;

  return (
    <section className={styles.directAddressSection}>
      <label htmlFor="address" className={styles.label}>
        Indirizzo
      </label>

      <div className={styles.directAddressControls}>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => handleAddressChange(e.target.value)}
          onBlur={() => setTimeout(() => clearGeocodeResults(), 120)}
          className={styles.input}
        />

        <button
          type="button"
          className={styles.button}
          onClick={() => getServiceStations()}
          disabled={loadingServiceStations}
        >
          {loadingServiceStations ? "Caricamento…" : "Cerca"}
        </button>
      </div>

      <aside
        className={[
          styles.directAddressPanel,
          isPanelOpen ? styles.directAddressPanelOpen : "",
        ].join(" ")}
        aria-hidden={!isPanelOpen}
      >
        <ul className={styles.directAddressList}>
          {geocodeFeatures.map((feature) => {
            const geocoding = feature?.properties?.geocoding;
            const label = geocoding?.label || geocoding?.name || "Risultato";
            const key = geocoding?.place_id || label;

            return (
              <li key={key} className={styles.directAddressListItem}>
                <button
                  type="button"
                  className={styles.directAddressListButton}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectGeocodeFeature(feature)}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </section>
  );
};