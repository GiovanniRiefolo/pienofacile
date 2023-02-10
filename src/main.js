import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faMinus,
  faLocationDot,
  faHouseBlank,
  faCircleHeart,
  faMagnifyingGlassLocation,
} from "@fortawesome/pro-regular-svg-icons";

import App from "./App.vue";
import router from "./router";

import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";

import PrimeVue from "primevue/config";

import "./assets/app.scss";

// add icons to the library
library.add(
  faPlus,
  faMinus,
  faLocationDot,
  faHouseBlank,
  faCircleHeart,
  faMagnifyingGlassLocation
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(OpenLayersMap);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
