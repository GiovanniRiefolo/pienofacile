import { ServiceStations } from "./components/service-stations";
import ServiceStationsProvider from "./contexts/service-stations-context";
import { PrimeReactProvider } from "primereact/api";

export default async function Page() {
  return (
    <PrimeReactProvider>
      <ServiceStationsProvider>
        <ServiceStations />
      </ServiceStationsProvider>
    </PrimeReactProvider>
  );
}
