<script setup>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>
  <header class="site-header">
    <h1 class="site-header__title">Pienofacile.online</h1>
    <nav class="site-header__nav">
      <RouterLink to="/"><font-awesome-icon icon="fa-light fa-house-blank" aria-label="Torna alla home"/></RouterLink>
      <RouterLink to="/donate"><font-awesome-icon icon="fa-light fa-circle-heart" aria-label="Dona allo sviluppatore"/></RouterLink>
    </nav>
  </header>

  <RouterView/>
</template>