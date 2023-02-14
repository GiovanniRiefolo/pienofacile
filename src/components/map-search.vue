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

onMounted(() => {
});

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
    currency: "EUR"
  });
};

const selectedStationData = ref();
const showSelectedStationData = ref(false);
const showInfo = data => {
  console.log("click");
  selectedStationData.value = data;
  showSelectedStationData.value = true;
};

</script>

<template>


  <div class="map-search__wapper">

    <div class="map-search__result-info"
         v-if="showSelectedStationData === true">
      <h4>{{ selectedStationData.name }}</h4>
      <p>{{ selectedStationData.address }}</p>
      <ul>
        <template v-for="fuel in selectedStationData.fuels">
          <li v-if="(fuel.name === 'Benzina' || fuel.name === 'Gasolio') && fuel.isSelf === true">
            <p>{{ fuel.name }} {{ fuel.price }}</p>
          </li>
        </template>
      </ul>
      <a :href="'#' + selectedStationData.id">vai alla voce in elenco</a>
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
    top: 0;
    width: calc(100vw - 32px);
    padding: 16px;
    background-color: white;
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
    background-color: #217D72;
    border: 2px solid #264653;
    border-radius: 100%;
    box-shadow: 4px 4px 0 0 rgb(0 0 0 / 30%);
    box-sizing: border-box;

    color: white;

    &.user-location {
      border-color: #ad391c;
      background-color: #E76F51;
      color: black;
    }
  }

}
</style>
