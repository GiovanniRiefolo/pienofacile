<script setup>
import { ref, onMounted } from "vue";
import { default as axios } from "axios";

onMounted(() => {
});
/**
const fuels = [
  {
    id: "1-x",
    description: "Benzina"
  },
  {
    id: "1-1",
    description: "Benzina (Self)"
  },
  {
    id: "1-0",
    description: "Benzina (Servito)"
  },
  {
    id: "2-x",
    description: "Gasolio"
  },
  {
    id: "2-1",
    description: "Gasolio (Self)"
  },
  {
    id: "2-0",
    description: "Gasolio (Servito)"
  },
  {
    id: "3-x",
    description: "Metano"
  },
  {
    id: "3-1",
    description: "Metano (Self)"
  },
  {
    id: "3-0",
    description: "Metano (Servito)"
  },
  {
    id: "4-x",
    description: "GPL"
  },
  {
    id: "4-1",
    description: "GPL (Self)"
  },
  {
    id: "4-0",
    description: "GPL (Servito)"
  },
  {
    id: "323-x",
    description: "L-GNC"
  },
  {
    id: "323-1",
    description: "L-GNC (Self)"
  },
  {
    id: "323-0",
    description: "L-GNC (Servito)"
  },
  {
    id: "324-x",
    description: "GNL"
  },
  {
    id: "324-1",
    description: "GNL (Self)"
  },
  {
    id: "324-0",
    description: "GNL (Servito)"
  }
];
**/
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
