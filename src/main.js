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
  faTimes,
} from "@fortawesome/pro-regular-svg-icons";

import {
  faCarSide,
  faGasPump,
  faSpinnerThird,
  faListRadio,
  faEuro,
  faRoute,
} from "@fortawesome/pro-solid-svg-icons";

import App from "./App.vue";
import router from "./router";

import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";

import PrimeVue from "primevue/config";

import "./assets/app.scss";

// add icons to the library
library.add(
  faCarSide,
  faGasPump,
  faPlus,
  faMinus,
  faLocationDot,
  faHouseBlank,
  faCircleHeart,
  faMagnifyingGlassLocation,
  faSpinnerThird,
  faListRadio,
  faEuro,
  faRoute,
  faTimes
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  locale: {
    startsWith: "Inizia con",
    contains: "Contiene",
    notContains: "Non contiene",
    endsWith: "Finisce con",
    equals: "È uguale",
    notEquals: "Non è uguale",
    noFilter: "Nessun filtro",
    lt: "Minore di",
    lte: "Less than or equal to",
    gt: "Maggiore di",
    gte: "Greater than or equal to",
    dateIs: "La data è",
    dateIsNot: "La data non è",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Cancella",
    apply: "Applica",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Sì",
    reject: "No",
    choose: "Sceglie",
    upload: "Upload",
    cancel: "Cancella",
    completed: "Completato",
    pending: "In corso",
    dayNames: [
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
    dayNamesMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
    monthNames: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    monthNamesShort: [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dic",
    ],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found", // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} risultati disponibili",
    selectionMessage: "{0} elementi selezionati",
    emptySelectionMessage: "Nessun elemento selezionato",
    emptySearchMessage: "Nessun risultato trovato",
    emptyMessage: "Nessuna opzione disponibile",
    aria: {
      trueLabel: "Vero",
      falseLabel: "Falso",
      nullLabel: "Non selezionata",
      star: "1 stella",
      stars: "{star} stelle",
      selectAll: "Seleziona tutti gli elementi",
      unselectAll: "Deselezionati tutti gli elementi ",
      close: "Chiudi",
      previous: "Precedente",
      next: "Successivo",
      navigation: "Navigazione",
      scrollTop: "Scrolla Su",
      moveTop: "Muovi Top",
      moveUp: "Muovi Sopra",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "{page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
    },
  },
});
app.use(OpenLayersMap);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
