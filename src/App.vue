<template>
  <RouterView />
  <Toaster :theme="isDark ? 'dark' : 'light'" closeButton position="top-right" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>
