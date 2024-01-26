<template>
  <section class="w-full h-full">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <span class="flex items-center mb-6 text-2xl font-semibold"> World Images </span>
      <div
        class="w-full rounded-md border bg-card text-card-foreground shadow-sm md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2xl">
            Sign in to your account
          </h1>
          <div v-if="hasErrors" class="font-bold text-red-700">Verify your credentials</div>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
              <Input
                v-model="form.email"
                type="email"
                name="email"
                id="email"
                auto-capitalize="none"
                auto-complete="email"
                auto-correct="off"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium">Password</label>
              <Input
                v-model="form.password"
                type="password"
                name="password"
                id="password"
                auto-complete="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button :disabled="isLoading" class="w-full" type="submit">
              <Loader2 v-if="isLoading" class="mr-2 animate-spin" />
              <span>Sign in</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDark } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores'
import { Loader2 } from 'lucide-vue-next'

useDark()

const { login } = useAuthStore()

const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const hasErrors = ref(false)

async function handleSubmit() {
  hasErrors.value = false
  isLoading.value = true

  try {
    await login(form)
  } catch (error) {
    console.log(error)
    hasErrors.value = true
    form.password = ''
  } finally {
    isLoading.value = false
  }
}
</script>
