<script setup>
import {ref, onMounted} from "vue";
import {default as axios} from "axios";

onMounted(() => {

})

const fuels = [
  {
    id: "1-x",
    description: "Benzina"
  }, {
    id: "1-1",
    description: "Benzina (Self)"
  }, {
    id: "1-0",
    description: "Benzina (Servito)"
  }, {
    id: "2-x",
    description: "Gasolio"
  }, {
    id: "2-1",
    description: "Gasolio (Self)"
  }, {
    id: "2-0",
    description: "Gasolio (Servito)"
  }, {
    id: "3-x",
    description: "Metano"
  }, {
    id: "3-1",
    description: "Metano (Self)"
  }, {
    id: "3-0",
    description: "Metano (Servito)"
  }, {
    id: "4-x",
    description: "GPL"
  }, {
    id: "4-1",
    description: "GPL (Self)"
  }, {
    id: "4-0",
    description: "GPL (Servito)"
  }, {
    id: "323-x",
    description: "L-GNC"
  },
  {
    id: "323-1",
    description: "L-GNC (Self)"
  }, {
    id: "323-0",
    description: "L-GNC (Servito)"
  }, {
    id: "324-x",
    description: "GNL"
  }, {
    id: "324-1",
    description: "GNL (Self)"
  },
  {
    id: "324-0",
    description: "GNL (Servito)"
  }
]

const data = ref({
  points: [{
    lat: 46.0710668,
    lng: 13.2345794,
  }],
  fuelType: null,
  radius: 5
})

const results = ref([])

const fetchData = () => {
  axios
      .post('https://carburanti.mise.gov.it/ospzApi/search/zone', data.value)
      .then(response => result.value = response.results)
      .catch(e => console.log(e))
}
</script>
<template>

  <select v-model="data.fuelType">
    <option :key="fuel.id" v-for="fuel in fuels">
      {{ fuel.description }}
    </option>
  </select>
  <button @click="fetchData">trova carburanti</button>

  <ul>
    <li v-for="result in results">
      {{ result }}
    </li>
  </ul>
</template>