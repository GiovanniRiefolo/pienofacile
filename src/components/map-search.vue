<script setup>
import { watch, ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps(["mapData", "radius", "points"]);

watch(
  () => [props.mapData, props.points, props.radius],
  (data) => {
    // console.log(data);
    centerMap.value[1] = data[1][0]["lat"];
    centerMap.value[0] = data[1][0]["lng"];
    zoom.value = calculateZoom(props.radius);
  }
);

onMounted(() => {});

const centerMap = ref([0, 0]);
const rotation = ref(0);
const projection = ref("EPSG:4326");
const zoom = ref(13);

const calculateZoom = (value) => {
  const maxValue = 13;
  const minValue = 11;
  return maxValue - (value / 10) * (maxValue - minValue);
};

const currencyFormatter = (value) => {
  return value.toLocaleString({
    style: "currency",
    currency: "EUR",
  });
};

const selectedStationData = ref();
const showSelectedStationData = ref(false);
const showInfo = (data) => {
  console.log("click");
  selectedStationData.value = data;
  showSelectedStationData.value = true;
};
</script>

<template>
  <div id="map" class="map-search__wapper" v-if="props.mapData.length > 0">
    <div
      class="map-search__result-info"
      v-if="showSelectedStationData === true"
    >
      <h4>{{ selectedStationData.name }}</h4>
      <p>{{ selectedStationData.address }}</p>
      <ul>
        <template v-for="fuel in selectedStationData.fuels">
          <li
            v-bind:key="fuel.id"
            v-if="
              (fuel.name === 'Benzina' || fuel.name === 'Gasolio') &&
              fuel.isSelf === true
            "
          >
            <p>
              {{ fuel.name }}<br />
              <span>SELF</span><strong>{{ fuel.price }} &euro;</strong>
            </p>
          </li>
          <li
            v-bind:key="fuel.id"
            v-else-if="fuel.name === 'Benzina' || fuel.name === 'Gasolio'"
          >
            <p>
              {{ fuel.name }}<br />
              <strong>{{ fuel.price }} &euro;</strong>
            </p>
          </li>
        </template>
      </ul>
      <div class="map-search__result-info__links">
        <a
          class="map-search__result-info__link navigate"
          :href="'#' + selectedStationData.id"
        >
          <font-awesome-icon icon="fa-solid fa-route" />
          Naviga fino a</a
        >
        <a
          class="map-search__result-info__link check-prices"
          :href="'#' + selectedStationData.id"
        >
          <font-awesome-icon icon="fa-solid fa-euro" />
          Vedi altri prezzi</a
        >
      </div>
    </div>

    <ol-map
      style="height: 80svh"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
    >
      <ol-view
        ref="view"
        :center="centerMap"
        :rotation="rotation"
        :projection="projection"
        :zoom="zoom"
      />

      <ol-overlay :position="centerMap">
        <template v-slot="slotProps">
          <div class="o-marker">
            <div class="o-marker__icon user-location">
              <font-awesome-icon icon="fa-solid fa-car-side" />
            </div>
          </div>
        </template>
      </ol-overlay>

      <ol-overlay
        v-for="data in mapData"
        :position="[data.location.lng, data.location.lat]"
        @click="showInfo(data)"
      >
        <template v-slot="slotProps">
          <div class="o-marker"></div>
          <div class="o-marker__icon">
            <font-awesome-icon icon="fa-solid fa-gas-pump" />
          </div>
        </template>
      </ol-overlay>

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </ol-map>
  </div>
</template>

<style lang="scss" scoped>
.map-search {
  &__wapper {
    position: relative;
    padding: 16px;
    background-color: white;
  }

  &__result-info {
    position: absolute;
    z-index: 999;
    top: 32px;
    left: -50%;
    right: -50%;
    margin: auto;
    padding: 16px;
    width: calc(100vw - 64px);
    border: 2px solid #264653;
    box-shadow: 8px 8px 0 0 rgb(0 0 0 / 30%);
    background-color: white;

    & h4 {
      margin: 0 0 8px;
    }

    & p {
      font-size: 0.875rem;
    }

    & ul {
      display: flex;
      width: 100%;
      flex-flow: row wrap;
      margin: 8px 0 16px;
      padding: 0;

      & li {
        width: 50%;
        padding: 6px 0;
        list-style-type: none;

        & p {
          margin: 0;

          & span {
            padding: 2px 4px;
            background-color: #264653;
            border-radius: 4px;
            margin-right: 4px;
            color: white;
            font: {
              weight: 600;
              size: 0.65rem;
            }
            letter-spacing: 1px;
          }
        }
      }
    }

    &__links {
      display: flex;
      flex-flow: row nowrap;
      gap: 4px;
      justify-content: space-between;
    }

    &__link {
      display: flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      padding: 6px 8px;
      background-color: #217d72;
      color: white;
      font: {
        weight: 500;
        size: 0.875rem;
      }
      text-decoration: none;
      border-radius: 6px;

      &.navigate {
        background-color: white;
        color: #217d72;
      }

      &.check-prices {
        background-color: #217d72;
        color: white;
      }
    }
  }
}

.o-marker {
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 34px;
    height: 34px;
    background-color: #217d72;
    border: 2px solid #264653;
    border-radius: 100%;
    box-shadow: 4px 4px 0 0 rgb(0 0 0 / 30%);
    box-sizing: border-box;

    color: white;

    &.user-location {
      border-color: #ad391c;
      background-color: #e76f51;
      color: black;
    }
  }
}
</style>
