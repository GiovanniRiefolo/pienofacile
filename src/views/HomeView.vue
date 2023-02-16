<script setup>
import { ref, onMounted } from "vue";
import { default as axios } from "axios";
import Slider from "primevue/slider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

import MapSearch from "../components/map-search.vue";
import FillingStationList from "../components/filling-station-list.vue";

const userPosition = ref({
  points: [],
  radius: 5,
});

const errorMessage = ref();

const loadingGeo = ref(false);
const loadingMap = ref(false);

const address = ref({
  street: null,
  housenumber: null,
  city: null,
  county: null,
  country: "Italia",
  postalcode: null,
});

const provences = [
  {
    nome: "Agrigento",
    sigla: "AG",
    regione: "Sicilia",
  },
  {
    nome: "Alessandria",
    sigla: "AL",
    regione: "Piemonte",
  },
  {
    nome: "Ancona",
    sigla: "AN",
    regione: "Marche",
  },
  {
    nome: "Arezzo",
    sigla: "AR",
    regione: "Toscana",
  },
  {
    nome: "Ascoli Piceno",
    sigla: "AP",
    regione: "Marche",
  },
  {
    nome: "Asti",
    sigla: "AT",
    regione: "Piemonte",
  },
  {
    nome: "Avellino",
    sigla: "AV",
    regione: "Campania",
  },
  {
    nome: "Bari",
    sigla: "BA",
    regione: "Puglia",
  },
  {
    nome: "Barletta-Andria-Trani",
    sigla: "BT",
    regione: "Puglia",
  },
  {
    nome: "Belluno",
    sigla: "BL",
    regione: "Veneto",
  },
  {
    nome: "Benevento",
    sigla: "BN",
    regione: "Campania",
  },
  {
    nome: "Bergamo",
    sigla: "BG",
    regione: "Lombardia",
  },
  {
    nome: "Biella",
    sigla: "BI",
    regione: "Piemonte",
  },
  {
    nome: "Bologna",
    sigla: "BO",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Bolzano/Bozen",
    sigla: "BZ",
    regione: "Trentino-Alto Adige/Südtirol",
  },
  {
    nome: "Brescia",
    sigla: "BS",
    regione: "Lombardia",
  },
  {
    nome: "Brindisi",
    sigla: "BR",
    regione: "Puglia",
  },
  {
    nome: "Cagliari",
    sigla: "CA",
    regione: "Sardegna",
  },
  {
    nome: "Caltanissetta",
    sigla: "CL",
    regione: "Sicilia",
  },
  {
    nome: "Campobasso",
    sigla: "CB",
    regione: "Molise",
  },
  {
    nome: "Carbonia-Iglesias",
    sigla: "CI",
    regione: "Sardegna",
  },
  {
    nome: "Caserta",
    sigla: "CE",
    regione: "Campania",
  },
  {
    nome: "Catania",
    sigla: "CT",
    regione: "Sicilia",
  },
  {
    nome: "Catanzaro",
    sigla: "CZ",
    regione: "Calabria",
  },
  {
    nome: "Chieti",
    sigla: "CH",
    regione: "Abruzzo",
  },
  {
    nome: "Como",
    sigla: "CO",
    regione: "Lombardia",
  },
  {
    nome: "Cosenza",
    sigla: "CS",
    regione: "Calabria",
  },
  {
    nome: "Cremona",
    sigla: "CR",
    regione: "Lombardia",
  },
  {
    nome: "Crotone",
    sigla: "KR",
    regione: "Calabria",
  },
  {
    nome: "Cuneo",
    sigla: "CN",
    regione: "Piemonte",
  },
  {
    nome: "Enna",
    sigla: "EN",
    regione: "Sicilia",
  },
  {
    nome: "Fermo",
    sigla: "FM",
    regione: "Marche",
  },
  {
    nome: "Ferrara",
    sigla: "FE",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Firenze",
    sigla: "FI",
    regione: "Toscana",
  },
  {
    nome: "Foggia",
    sigla: "FG",
    regione: "Puglia",
  },
  {
    nome: "Forlì-Cesena",
    sigla: "FC",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Frosinone",
    sigla: "FR",
    regione: "Lazio",
  },
  {
    nome: "Genova",
    sigla: "GE",
    regione: "Liguria",
  },
  {
    nome: "Gorizia",
    sigla: "GO",
    regione: "Friuli-Venezia Giulia",
  },
  {
    nome: "Grosseto",
    sigla: "GR",
    regione: "Toscana",
  },
  {
    nome: "Imperia",
    sigla: "IM",
    regione: "Liguria",
  },
  {
    nome: "Isernia",
    sigla: "IS",
    regione: "Molise",
  },
  {
    nome: "L'Aquila",
    sigla: "AQ",
    regione: "Abruzzo",
  },
  {
    nome: "La Spezia",
    sigla: "SP",
    regione: "Liguria",
  },
  {
    nome: "Latina",
    sigla: "LT",
    regione: "Lazio",
  },
  {
    nome: "Lecce",
    sigla: "LE",
    regione: "Puglia",
  },
  {
    nome: "Lecco",
    sigla: "LC",
    regione: "Lombardia",
  },
  {
    nome: "Livorno",
    sigla: "LI",
    regione: "Toscana",
  },
  {
    nome: "Lodi",
    sigla: "LO",
    regione: "Lombardia",
  },
  {
    nome: "Lucca",
    sigla: "LU",
    regione: "Toscana",
  },
  {
    nome: "Macerata",
    sigla: "MC",
    regione: "Marche",
  },
  {
    nome: "Mantova",
    sigla: "MN",
    regione: "Lombardia",
  },
  {
    nome: "Massa-Carrara",
    sigla: "MS",
    regione: "Toscana",
  },
  {
    nome: "Matera",
    sigla: "MT",
    regione: "Basilicata",
  },
  {
    nome: "Medio Campidano",
    sigla: "VS",
    regione: "Sardegna",
  },
  {
    nome: "Messina",
    sigla: "ME",
    regione: "Sicilia",
  },
  {
    nome: "Milano",
    sigla: "MI",
    regione: "Lombardia",
  },
  {
    nome: "Modena",
    sigla: "MO",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Monza e della Brianza",
    sigla: "MB",
    regione: "Lombardia",
  },
  {
    nome: "Napoli",
    sigla: "NA",
    regione: "Campania",
  },
  {
    nome: "Novara",
    sigla: "NO",
    regione: "Piemonte",
  },
  {
    nome: "Nuoro",
    sigla: "NU",
    regione: "Sardegna",
  },
  {
    nome: "Ogliastra",
    sigla: "OG",
    regione: "Sardegna",
  },
  {
    nome: "Olbia-Tempio",
    sigla: "OT",
    regione: "Sardegna",
  },
  {
    nome: "Oristano",
    sigla: "OR",
    regione: "Sardegna",
  },
  {
    nome: "Padova",
    sigla: "PD",
    regione: "Veneto",
  },
  {
    nome: "Palermo",
    sigla: "PA",
    regione: "Sicilia",
  },
  {
    nome: "Parma",
    sigla: "PR",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Pavia",
    sigla: "PV",
    regione: "Lombardia",
  },
  {
    nome: "Perugia",
    sigla: "PG",
    regione: "Umbria",
  },
  {
    nome: "Pesaro e Urbino",
    sigla: "PU",
    regione: "Marche",
  },
  {
    nome: "Pescara",
    sigla: "PE",
    regione: "Abruzzo",
  },
  {
    nome: "Piacenza",
    sigla: "PC",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Pisa",
    sigla: "PI",
    regione: "Toscana",
  },
  {
    nome: "Pistoia",
    sigla: "PT",
    regione: "Toscana",
  },
  {
    nome: "Pordenone",
    sigla: "PN",
    regione: "Friuli-Venezia Giulia",
  },
  {
    nome: "Potenza",
    sigla: "PZ",
    regione: "Basilicata",
  },
  {
    nome: "Prato",
    sigla: "PO",
    regione: "Toscana",
  },
  {
    nome: "Ragusa",
    sigla: "RG",
    regione: "Sicilia",
  },
  {
    nome: "Ravenna",
    sigla: "RA",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Reggio di Calabria",
    sigla: "RC",
    regione: "Calabria",
  },
  {
    nome: "Reggio nell'Emilia",
    sigla: "RE",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Rieti",
    sigla: "RI",
    regione: "Lazio",
  },
  {
    nome: "Rimini",
    sigla: "RN",
    regione: "Emilia-Romagna",
  },
  {
    nome: "Roma",
    sigla: "RM",
    regione: "Lazio",
  },
  {
    nome: "Rovigo",
    sigla: "RO",
    regione: "Veneto",
  },
  {
    nome: "Salerno",
    sigla: "SA",
    regione: "Campania",
  },
  {
    nome: "Sassari",
    sigla: "SS",
    regione: "Sardegna",
  },
  {
    nome: "Savona",
    sigla: "SV",
    regione: "Liguria",
  },
  {
    nome: "Siena",
    sigla: "SI",
    regione: "Toscana",
  },
  {
    nome: "Siracusa",
    sigla: "SR",
    regione: "Sicilia",
  },
  {
    nome: "Sondrio",
    sigla: "SO",
    regione: "Lombardia",
  },
  {
    nome: "Taranto",
    sigla: "TA",
    regione: "Puglia",
  },
  {
    nome: "Teramo",
    sigla: "TE",
    regione: "Abruzzo",
  },
  {
    nome: "Terni",
    sigla: "TR",
    regione: "Umbria",
  },
  {
    nome: "Torino",
    sigla: "TO",
    regione: "Piemonte",
  },
  {
    nome: "Trapani",
    sigla: "TP",
    regione: "Sicilia",
  },
  {
    nome: "Trento",
    sigla: "TN",
    regione: "Trentino-Alto Adige/Südtirol",
  },
  {
    nome: "Treviso",
    sigla: "TV",
    regione: "Veneto",
  },
  {
    nome: "Trieste",
    sigla: "TS",
    regione: "Friuli-Venezia Giulia",
  },
  {
    nome: "Udine",
    sigla: "UD",
    regione: "Friuli-Venezia Giulia",
  },
  {
    nome: "Valle d'Aosta/Vallée d'Aoste",
    sigla: "AO",
    regione: "Valle d'Aosta/Vallée d'Aoste",
  },
  {
    nome: "Varese",
    sigla: "VA",
    regione: "Lombardia",
  },
  {
    nome: "Venezia",
    sigla: "VE",
    regione: "Veneto",
  },
  {
    nome: "Verbano-Cusio-Ossola",
    sigla: "VB",
    regione: "Piemonte",
  },
  {
    nome: "Vercelli",
    sigla: "VC",
    regione: "Piemonte",
  },
  {
    nome: "Verona",
    sigla: "VR",
    regione: "Veneto",
  },
  {
    nome: "Vibo Valentia",
    sigla: "VV",
    regione: "Calabria",
  },
  {
    nome: "Vicenza",
    sigla: "VI",
    regione: "Veneto",
  },
  {
    nome: "Viterbo",
    sigla: "VT",
    regione: "Lazio",
  },
];

const getUserLocation = () =>
  new Promise((res, rej) => {
    loadingGeo.value = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        userPosition.value.points = [];
        userPosition.value.points.push(currentPosition);
        loadingGeo.value = false;
        res(position);
      },
      (error) => {
        console.log(error);
        rej(error);
      }
    );
  });

const getUserLocationFromAddress = () => {
  loadingGeo.value = true;
  // https://nominatim.org/release-docs/develop/api/Search/
  axios
    .post(
      "api/reverseGeo" +
        "search?street=" +
        address.value.street +
        "+" +
        address.value.housenumber +
        "&city=" +
        address.value.city +
        "&country=" +
        address.value.country +
        "&county=" +
        address.value.county +
        "&postalcode=" +
        address.value.postalcode +
        "&format=jsonv2",
      {}
    )
    .then((response) => {
      let currentPosition = {
        lat: response.data[0].lat,
        lng: response.data[0].lon,
      };
      userPosition.value.points = [];
      userPosition.value.points.push(currentPosition);
      loadingGeo.value = false;
    })
    .catch((e) => console.log(e));
};

const userAddressFormVisibility = ref(false);

const toggleUserAddressForm = () => {
  userAddressFormVisibility.value = !userAddressFormVisibility.value;
};

const updateRadio = (val) => {
  if (val === "increment" && userPosition.value.radius < 10) {
    userPosition.value.radius += 1;
  } else if (val === "decrement" && userPosition.value.radius > 1) {
    userPosition.value.radius -= 1;
  }
};

const results = ref([]);

const fetchData = () => {
  loadingMap.value = true;
  axios
    .post("api/zone", userPosition.value)
    .then((response) => {
      if (response.status === 200) {
        results.value = response.data.results;
      } else {
        console.log("Non sono riuscito a recuperare i risultati");
      }
      loadingMap.value = false;
    })
    .catch((e) => console.log(e));
};
</script>

<template>
  <section class="gelocalization">
    <h2><span>Step 1 &mdash; </span>Luogo</h2>

    <template v-if="userPosition.points.length === 0">
      <template v-if="loadingGeo === true">
        <div class="geolocalization__loading">
          <h2>
            <font-awesome-icon icon="fa-spin fa-solid fa-spinner-third" spin />
            Sto cercando ...
          </h2>
        </div>
      </template>
      <template v-else>
        <Button @click="getUserLocation()">
          <font-awesome-icon icon="fa-regular fa-location-dot" />
          Geolocalizzami
        </Button>
        <div class="gelocalization__toggler">
          <p>oppure</p>
          <p class="toggle-link" @click="toggleUserAddressForm()">
            <font-awesome-icon icon="fa-regular fa-location-dot" />
            Inserisci la posizione
          </p>
        </div>
      </template>
    </template>

    <template v-if="userPosition.points.length > 0">
      <div class="geolocalization__founded-place">
        <figure>
          <source
            srcset="
              ../assets/images/trovato.png          1x,
              ../assets/images/trovato@2x.png2x.png 2x
            "
          />
          <img src="../assets/images/trovato.png" />
        </figure>
        <div>
          <h3>Trovato!</h3>
          <div>
            <p v-for="point in userPosition.points" v-bind:key="point">
              <strong>Latitudine:</strong> {{ point.lat }},<br />
              <strong>Longidutine:</strong>{{ point.lng }}
            </p>
            <p
              class="geolocalization__change-manually"
              @click="toggleUserAddressForm()"
            >
              Modifica i dati manualmente
            </p>
          </div>
        </div>
      </div>
    </template>
  </section>

  <section v-show="userAddressFormVisibility === true">
    <InputText
      type="text"
      v-model="address.street"
      placeholder="Via"
      autocomplete="true"
    />
    <InputText
      type="number"
      v-model="address.housenumber"
      placeholder="Civico"
      autocomplete="true"
    />
    <InputText
      type="text"
      v-model="address.city"
      placeholder="Città"
      autocomplete="true"
    />
    <Dropdown
      v-model="address.county"
      :options="provences"
      optionLabel="nome"
      optionValue="sigla"
      placeholder="Seleziona la provincia"
      :filter="true"
      filterPlaceholder="Cerca la provincia"
    />
    <InputText
      id="zip"
      v-model="address.postalcode"
      name="cap"
      type="text"
      pattern="[0-9]*"
      placeholder="cap"
      autocomplete="true"
    />
    <Button @click="getUserLocationFromAddress()"> Recupera posizione </Button>
  </section>

  <section class="distance">
    <h2><span>Step 2 &mdash; </span>Distanza</h2>
    <Slider v-model="userPosition.radius" :step="1" :min="1" :max="10" />

    <div class="distance__radio-input">
      <button @click="updateRadio('decrement')">
        <font-awesome-icon icon="fa-regular fa-minus" />
      </button>
      <input type="number" min="1" max="10" v-model="userPosition.radius" />
      <span>Km</span>
      <button @click="updateRadio('increment')">
        <font-awesome-icon icon="fa-regular fa-plus" />
      </button>
    </div>
  </section>

  <Button
    @click="fetchData()"
    class="search-button"
    :disabled="!userPosition.points"
  >
    <font-awesome-icon icon="fa-regular fa-magnifying-glass-location" />
    Trova Stazioni
  </Button>

  <template v-if="errorMessage">
    <!-- // TODO: Test this error message -->
    <p>Attenzione! {{ errorMessage }}</p>
  </template>

  <MapSearch
    :map-data="results"
    :points="userPosition.points"
    :radius="userPosition.radius"
  />

  <FillingStationList :stationList="results" />
</template>
