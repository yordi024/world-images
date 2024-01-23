<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <RouterLink to="/" class="mr-5 font-bold text-lg">WI</RouterLink>
      <nav class="flex items-center space-x-4 lg:space-x-6">
        <RouterLink
          v-for="item in menu"
          :key="item.route"
          :to="item.url"
          class="text-sm font-medium transition-colors hover:text-primary"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
      <div class="ml-auto flex items-center space-x-4">
        <div class="text-sm font-medium transition-colors text-primary">Admin</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'

const menu = [
  {
    name: 'Home',
    url: '/',
    route: 'home',
  },
  {
    name: 'Sellers',
    url: '/sellers',
    route: 'sellers',
  },
]
</script>
