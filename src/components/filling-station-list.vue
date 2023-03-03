<script setup>
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const props = defineProps(["stationList"]);

const getLogo = (brand) => {
  let src = "";
  switch (brand) {
    case "Tamoil":
      src = "./src/assets/images/tamoil-small.png";
      break;
    case "Q8":
      src = "./src/assets/images/q8-medium.png";
      break;
    case "AgipEni":
      src = "./src/assets/images/agip-eni-small.png";
      break;
    case "Esso":
      src = "./src/assets/images/esso-small.png";
      break;
    case "Api-Ip":
      src = "./src/assets/images/apiip-small.png";
      break;
    case "SanMarcoPetroli":
      src = "./src/assets/images/logo-smp-spa.svg";
      break;
    case "OilItalia":
      src = "./src/assets/images/logo-oil-italia.png";
      break;
    case "CONAD":
      src = "./src/assets/images/conad-logo-small.png";
      break;
    case "PompeBianche":
      src = "./src/assets/images/pompebianche.png";
      break;
    case "Repsol":
      src = "./src/assets/images/repsol-logo-small.png";
      break;
  }
  return src;
};

const currencyFormatter = value => {
  return value.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 3
    }
  );
};
</script>
<template>
  <ul class="filling-station-list">
    <li :id="result.id" :key="result.id" v-for="result in props.stationList">
      <h3>{{ result.name }}</h3>
      <ul>
        <li>
          <figure>
            <img :src="getLogo(result.brand)" :alt="'Logo ' + result.brand" width="48" />
            <figcaption>
              {{ result.brand }}
            </figcaption>
          </figure>
        </li>
        <li>
          <table>
            <thead>
            <tr>
              <td>Carburante</td>
              <td>Prezzo</td>
            </tr>
            </thead>
            <tbody>
            <tr :key="fuel.fuelId" v-for="fuel in result.fuels">
              <td>
                {{ fuel.name }}
              </td>
              <td>
                {{ currencyFormatter(fuel.price) }}
              </td>
            </tr>
            </tbody>
          </table>
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

    figure {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 8px;
      margin: 0;

      & img {
        width: auto;
        max-height: 32px;
        max-width: 48px;
      }
    }

    & > ul {
      padding: 0;

      & > li {
        list-style-type: none;

        table {
          margin: 16px 0;
          width: 100%;

          & tr td {
            padding: 6px 8px;
          }

          & thead {
            & tr td {
              background: #264653;
              color: white;
              font: {
                weight: 600
              }
            }
          }
        }
      }
    }

    &:target {
      background-color: #fcf8ed;
      border-color: #217d72;
    }
  }
}
</style>
