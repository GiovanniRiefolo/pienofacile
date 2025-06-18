import { ServiceStations } from "./components/service-stations";
import { ServiceStationsProvider } from "./contexts/service-stations-context";

export default async function Page() {
  return (
    <ServiceStationsProvider>
      <ServiceStations />
    </ServiceStationsProvider>
  );
}
