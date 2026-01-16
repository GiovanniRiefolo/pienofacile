"use client";

import {useState, createContext} from "react";

export const ServiceStationsContext = createContext("");

export default function ServiceStationsProvider({children}) {
    const [serviceStationsList, setServiceStationsList] = useState([]);
    const [position, setPosition] = useState(null);
    const [radius, setRadius] = useState(5);
    const [address, setAddress] = useState("");
    const [loadingServiceStations, setLoadingServiceStations] = useState(false);

    const [geocodeFeatures, setGeocodeFeatures] = useState([]);

    const clearGeocodeResults = () => setGeocodeFeatures([]);

    const getServiceStations = (latOverride, lngOverride) => {
        setLoadingServiceStations(true);

        const hasOverrides = Number.isFinite(latOverride) && Number.isFinite(lngOverride);
        const effectivePosition = hasOverrides ? [latOverride, lngOverride] : position;

        if (!effectivePosition) {
            setLoadingServiceStations(false);
            return;
        }

        fetch("api/zone", {
            method: "POST",
            body: JSON.stringify({
                points: [{lat: effectivePosition[0], lng: effectivePosition[1]}],
                radius: radius,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {
                    const enriched = (response.data.results || []).map((station) => {
                        const distance = station.distance != null ? Number(station.distance) : null;

                        const fuelsByName = (station.fuels || []).reduce((acc, fuel) => {
                            if (!acc[fuel.name]) acc[fuel.name] = {served: null, self: null};
                            if (fuel.isSelf) {
                                acc[fuel.name].self = fuel.price;
                            } else {
                                acc[fuel.name].served = fuel.price;
                            }
                            return acc;
                        }, {});
                        const fuels = Object.entries(fuelsByName).map(([name, prices]) => ({
                            name,
                            prices,
                        }));

                        return {...station, distance, fuels};
                    });
                    setServiceStationsList(enriched);
                }
            })
            .finally(() => setLoadingServiceStations(false));
    };

    const geocodeLocation = (rawAddress) => {
        const normalizedAddress = (rawAddress || "").trim();

        if (normalizedAddress.length < 3) {
            setGeocodeFeatures([]);
            return;
        }

        fetch("api/geocode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ address: normalizedAddress }),
        })
            .then((response) => response.json())
            .then((response) => {
                // Keep raw features to avoid extra transformations.
                setGeocodeFeatures(Array.isArray(response?.features) ? response.features : []);
            });
    };

    const selectGeocodeFeature = (feature) => {
        const coordinates = feature?.geometry?.coordinates;

        // Nominatim geocodejson: coordinates are [lon, lat]
        const lng = Array.isArray(coordinates) ? Number(coordinates[0]) : NaN;
        const lat = Array.isArray(coordinates) ? Number(coordinates[1]) : NaN;

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

        const label =
            feature?.properties?.geocoding?.label ||
            feature?.properties?.geocoding?.name ||
            "";

        if (label) setAddress(label);

        setPosition([lat, lng]);
        setGeocodeFeatures([]);

        getServiceStations(lat, lng);
    };

    return (
        <ServiceStationsContext.Provider
            value={{
                serviceStationsList,
                setServiceStationsList,
                position,
                setPosition,
                radius,
                setRadius,
                address,
                setAddress,
                getServiceStations,
                geocodeLocation,
                geocodeFeatures,
                clearGeocodeResults,
                selectGeocodeFeature,
                loadingServiceStations
            }}
        >
            {children}
        </ServiceStationsContext.Provider>
    );
}
