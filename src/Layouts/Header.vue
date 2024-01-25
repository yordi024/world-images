<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <RouterLink to="/" class="mr-5 font-bold text-lg text-primary"><Globe2 /></RouterLink>
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
        <Button @click="toggleDark()" class="px-2" size="sm" variant="ghost">
          <Sun v-if="isDark" class="h-5" />
          <Moon v-else class="h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            ><div class="text-sm font-medium transition-colors text-primary">
              Admin
            </div></DropdownMenuTrigger
          >
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="logout">Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useDark, useToggle } from '@vueuse/core/index.cjs'
import { Globe2, Moon, Sun } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores'

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

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { logout } = useAuthStore()
</script>
<style>
a.router-link-active {
  @apply text-primary;
}
</style>
