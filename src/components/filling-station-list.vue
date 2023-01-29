<script setup>
import {ref, onMounted} from "vue";
import {default as axios} from "axios";
import Slider from "primevue/slider";
import Divider from "primevue/divider";
import Button from "primevue/button";

onMounted(() => {
});

const position = ref({
  points: [],
  radius: 5
});

const errorMessage = ref();

const loading = ref(false)

const getUserLocation = () => {
  if (!navigator.geolocation) {
    errorMessage.value = "Geolocalizzazione non supportata";
  } else {
    navigator.geolocation.getCurrentPosition((data) => {
      let currentPosition = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      };
      position.value.points = [];
      position.value.points.push(currentPosition);
    });
  }
};

const results = ref([]);

const fetchData = () => {
  loading.value = true
  axios
      .post("api/zone", position.value)
      .then((response) => {
        if (response.status === 200) {
          results.value = response.data.results;
        } else {
          console.log("Non sono riuscito a recuperare i risultati");
        }
        loading.value = false
      })
      .catch((e) => console.log(e));
};
</script>
<template>
  <section>
    <button @click="getUserLocation()">
      <font-awesome-icon icon="fa-light fa-location-dot"/>
      Geolocalizzami
    </button>
    <button @click="getUserLocation()">
      <font-awesome-icon icon="fa-light fa-location-dot"/>
      Inserisci la posizione
    </button>
    <template v-if="position.points">
      <p v-for="point in position.points"><strong>Latitudine:</strong> {{ point.lat }},<br/><strong>Longidutine:</strong> {{ point.lng }}</p>
    </template>
  </section>

  <section>
    <p>Area: {{ position.radius }} Km</p>
    <Slider v-model="position.radius" :step="1" :min="1" :max="10"/>
  </section>

  <Button @click="fetchData">trova carburanti</Button>


  <section>
    <Divider align="center">
      <span class="p-tag">Elenco distributori</span>
    </Divider>
    <template v-if="errorMessage">
      <p>Attenzione! {{ errorMessage }}</p>
    </template>
    <ul>
      <li :key="result.id" v-for="result in results">
        <h3>{{ result.name }}</h3>
        <ul>
          <li>Brand: {{ result.brand }}</li>
          <li>Prezzi:
            <ul>
              <li :key="fuel.fuelId" v-for="fuel in result.fuels">
                {{ fuel.name }}: {{ fuel.price }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>
