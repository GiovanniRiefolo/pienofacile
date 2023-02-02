<script setup>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>
  <header class="site-header">
    <picture>
      <svg xmlns="http://www.w3.org/2000/svg" width="216" height="68.417" viewBox="0 0 216 68.417"><text transform="translate(0 33)" fill="#264653" font-size="33" font-family="Inter" font-weight="800" letter-spacing="-0.04em"><tspan x="0" y="0">Pieno</tspan></text><rect width="35.2" height="8" rx="3" transform="translate(44 44.917)" fill="#217d72"/><rect width="35.2" height="8" rx="3" transform="translate(132 44.917)" fill="#2a9d8f"/><rect width="35.2" height="8" rx="3" transform="translate(88 44.917)" fill="#2a9d8f"/><text transform="translate(91.8 33)" fill="#264653" font-size="34" font-family="Inter" font-weight="500" letter-spacing="-0.04em"><tspan x="0" y="0">Facile</tspan></text><g transform="translate(-2162.667 156.417)"><ellipse cx="20" cy="20" rx="20" ry="20" transform="translate(2338.667 -128)" fill="#75ccb5"/><circle cx="12" cy="12" r="12" transform="translate(2346.667 -120)" fill="#fff"/></g><rect width="35.2" height="8" rx="3" transform="translate(0 44.917)" fill="#264653"/><g transform="translate(-2161.667 154.917)"><circle cx="8" cy="8" r="8" transform="translate(2357.667 -134)" fill="#fff"/><path d="M13.481,31.2C16.688,27.188,24,17.462,24,12A12,12,0,0,0,0,12c0,5.462,7.313,15.188,10.519,19.2a1.888,1.888,0,0,0,2.963,0ZM8,12a2,2,0,1,1,2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,1-2-2A2,2,0,0,1,18,10ZM8.038,15.306a5.011,5.011,0,0,0,7.925,0,1.248,1.248,0,0,1,2.075,1.388,7.492,7.492,0,0,1-12.075,0,1.248,1.248,0,1,1,2.075-1.387Z" transform="translate(2353.667 -137.917)" fill="#e76f51"/></g></svg>
    </picture>
    <h1 class="site-header__title">Pienofacile.online</h1>
    <nav class="site-header__nav">
      <RouterLink to="/"><font-awesome-icon icon="fa-light fa-house-blank" aria-label="Torna alla home"/></RouterLink>
      <RouterLink to="/donate"><font-awesome-icon icon="fa-light fa-circle-heart" aria-label="Dona allo sviluppatore"/></RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>