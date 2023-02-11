<script setup>
import { watch, ref, onMounted } from "vue";

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
</script>

<template>
  {{ props.radius }}
  {{ zoom }}
  <div class="map-search__wapper">
    <ol-map
      style="height: 700px"
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
            <div class="o-marker__icon"></div>
            <div class="o-marker__info">Sei qui!</div>
          </div>
        </template>
      </ol-overlay>

      <ol-overlay
        v-for="data in mapData"
        :position="[data.location.lng, data.location.lat]"
      >
        <template v-slot="slotProps">
          <div class="o-marker"></div>
          <div class="o-marker__icon"></div>
          <div class="o-marker__info">
            {{ data.name }}
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
    padding: 16px;
    background-color: white;
  }
}

.o-marker {
  &__icon {
    width: 30px;
    height: 40px;
    background: {
      image: url("./../assets/map-marker.png");
      repeat: no-repeat;
      position: center;
      size: 100%;
    }
  }

  &__info {
    background: white;
    padding: 8px;
    border-radius: 6px;
  }
}
</style>
