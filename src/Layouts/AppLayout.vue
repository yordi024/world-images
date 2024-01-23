<template>
  <div class="flex flex-col">
    <Header />

    <section class="flex-1 space-y-4 p-8 pt-6">
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>
