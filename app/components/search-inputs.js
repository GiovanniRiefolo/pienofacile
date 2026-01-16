"use client";

import {useContext, useState} from "react";
import {ServiceStationsContext} from "../contexts/service-stations-context";
import styles from "../app.module.css";
import {DirectAddressSearch} from "./direct-address-search";

export const SearchInputs = () => {
    const {
        radius,
        setRadius,
        getServiceStations,
        clearGeocodeResults,
        loadingServiceStations,
    } = useContext(ServiceStationsContext);

    const [directAddress, setDirectAddress] = useState(false);

    return (
        <div className={styles.header}>
            <section className={styles.heading}>
                <h1 className={styles.title}>
                    Pieno<span className={styles.title_alt}>Facile</span>
                </h1>

                <div className={styles.toggle}>
                    <span className={styles.toggleLabel}>Indirizzo diretto</span>
                    <button
                        type="button"
                        className={styles.toggleButton}
                        aria-pressed={directAddress}
                        onClick={() => {
                            const nextValue = !directAddress;
                            setDirectAddress(nextValue);
                            if (!nextValue) clearGeocodeResults();
                        }}
                    >
                        {directAddress ? "Vicino a me" : "Altro luogo"}
                    </button>
                </div>
            </section>

            <form className={styles.search}>
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
                            onClick={() => getServiceStations()}
                            disabled={loadingServiceStations}
                        >
                            {loadingServiceStations ? "Caricamento…" : "Cerca"}
                        </button>
                    </section>
                )}

                {directAddress && <DirectAddressSearch/>}
            </form>
        </div>
    );
};
