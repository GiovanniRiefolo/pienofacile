"use client";

import {useState, createContext} from "react";

export const ServiceStationsContext = createContext("");

export default function ServiceStationsProvider({children}) {
    const [serviceStationsList, setServiceStationsList] = useState([]);
    const [position, setPosition] = useState(null);
    const [radius, setRadius] = useState(5);
    const [address, setAddress] = useState("");
    const [loadingServiceStations, setLoadingServiceStations] = useState(false);

    const getServiceStations = () => {
        setLoadingServiceStations(true);
        if (!position) {
            setLoadingServiceStations(false);
            return;
        }
        fetch("api/zone", {
            method: "POST",
            body: JSON.stringify({
                points: [{lat: position[0], lng: position[1]}],
                radius: radius,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === 200) {
                    const enriched = (response.data.results || []).map((station) => {
                        const distance = station.distance != null ? Number(station.distance) : null;

                        const fuelsByName = (station.fuels || []).reduce((acc, fuel) => {
                            if (!acc[fuel.name]) acc[fuel.name] = { served: null, self: null };
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
                loadingServiceStations
            }}
        >
            {children}
        </ServiceStationsContext.Provider>
    );
}
