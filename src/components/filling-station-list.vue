<script setup>
import { ref, onMounted } from "vue";
import { default as axios } from "axios";

onMounted(() => {
});

const position = ref({
  points: [],
  radius: 5,
});

const errorMessage = ref();

const getUserLocation = () => {
  if (!navigator.geolocation) {
    errorMessage.value = "Geolocalizzazione non supportata";
  } else {
    navigator.geolocation.getCurrentPosition((data) => {
      let currentPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude,
      };
      position.value.points = [];
      position.value.points.push(currentPosition);
    });
  }
};

const results = ref([]);

const fetchData = () => {
  axios
    .post("api/zone", position.value)
    .then((response) => {
      if (response.status === 200) {
        results.value = response.data.results;
      } else {
        console.log("Non sono riuscito a recuperare i risultati");
      }
    })
    .catch((e) => console.log(e));
};
</script>
<template>
  <button @click="getUserLocation()">Geolocalizzami</button>
  <template v-if="position.points">
    <p v-for="point in position.points">Latitudine: {{ point.lat }}, Longidutine: {{ point.lng }}</p>
  </template>
  <button @click="fetchData">trova carburanti</button>
  <template v-if="errorMessage">
    <p>Attenzione! {{ errorMessage }}</p>
  </template>
  <ul>
    <li :key="result.id" v-for="result in results">
      <p>Nome: {{ result.name }}</p>
      <p>Brand: {{ result.brand }}</p>
      <p>Prezzi:</p>
      <ul>
        <li :key="fuel.fuelId" v-for="fuel in result.fuels">
          {{ fuel.name }}: {{ fuel.price }}
        </li>
      </ul>
    </li>
  </ul>
</template>
