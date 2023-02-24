<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const props = defineProps(["stationList"]);

const getLogo = (brand) => {
  let _src;
  switch (brand) {
    case brand === "Tamoil":
      _src = "src/assets/tamoil-small.png";
      break;
  }
  return _src;
};
</script>
<template>
  <ul class="filling-station-list">
    <li :id="result.id" :key="result.id" v-for="result in props.stationList">
      <h3>{{ result.name }}</h3>
      <ul>
        <li>Brand: {{ result.brand }}</li>
        <img :src="getLogo(result.brand)" :alt="'Logo ' + result.brand" />
        <li>
          Prezzi:
          <ul>
            <li :key="fuel.fuelId" v-for="fuel in result.fuels">
              {{ fuel.name }}: {{ fuel.price }}
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.filling-station-list {
  margin: 0;
  padding: 16px;

  & h3 {
    margin: 0 0 12px;
  }

  & > li {
    padding: 16px;
    border: 2px solid transparent;
    list-style-type: none;

    &:target {
      background-color: #fcf8ed;
      border-color: #217d72;
    }
  }
}
</style>
