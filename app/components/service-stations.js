"use client";

import { useContext } from "react";
import { ServiceStationsContext } from "../contexts/service-stations-context";
import { Map } from "../components/map.js";
import { SearchInputs } from "./search-inputs";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";

export const ServiceStations = () => {
  const { serviceStationsList, loadingServiceStations } = useContext(
    ServiceStationsContext
  );
  return (
    <main className="container flex flex-column gap-4">
      <SearchInputs />
      <Map />
      <section className="flex flex-column gap-2">
        {loadingServiceStations && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="4"
            aria-label="Caricamento in corso"
          />
        )}
        {serviceStationsList &&
          serviceStationsList.map((station) => (
            <Card
              footer={
                <div className="flex flex-row gap-2 align-items-center justify-content-between">
                  <Chip
                    label={new Date(station.insertDate).toLocaleDateString()}
                    icon="pi pi-calendar"
                  />
                  <Button
                    label="Apri Mappa"
                    icon="pi pi-map-marker"
                    outlined
                    size="small"
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${station.location.lat},${station.location.lng}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  />
                </div>
              }
              key={station.id}
              title={<>{station.name} </>}
              subTitle={
                <>
                  {station.brand} -{" "}
                  {station.distance && <>{station.distance.toFixed(2)} Km</>}{" "}
                </>
              }
            >
              {station.fuels &&
                station.fuels.map((fuel, index) => (
                  <div
                    className="flex flex-row gap-2 align-items-center py-1"
                    key={index}
                  >
                    <h4 className="m-0">{fuel.name}</h4>
                    <p className="m-0">Servito {fuel.prices.served}€</p> -
                    <p className="m-0">Self {fuel.prices.self}€</p>
                  </div>
                ))}
            </Card>
          ))}
      </section>
    </main>
  );
};
