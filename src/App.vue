<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="flex">
    <div class="flex-initial">
      <h1 class="site-title">Pienofacile.online</h1>
    </div>
    <div class="flex-auto">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
.site-title {
  font-size: 1rem;
}
</style>