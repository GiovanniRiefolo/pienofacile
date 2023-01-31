<script setup>
import "leaflet"

const props = defineProps(['points', 'radius'])

const map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

</script>

<template>
  <div id="map">
  </div>
</template>