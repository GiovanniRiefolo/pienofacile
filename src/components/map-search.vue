<script setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps(["mapData", "zoom", "points"]);

watch(
  () => [props.mapData, props.points],
  (data) => {
    console.log(data);
    centerMap.value.lat = data[1][0]["lat"];
    centerMap.value.lng = data[1][0]["lng"];
  }
);

onMounted(() => {});

const centerMap = ref({
  lat: 0,
  lng: 0,
});
const rotation = ref(0);
</script>

<template>
  <div style="height: 600px; width: 800px">
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px"
    >
      <ol-view
        ref="view"
        :center="centerMap.value"
        :rotation="rotation.value"
        :zoom="props.zoom"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </ol-map>
  </div>
</template>
