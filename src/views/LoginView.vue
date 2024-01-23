<template>
  <section class="w-full h-full">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <span class="flex items-center mb-6 text-2xl font-semibold"> World Images </span>
      <div
        class="w-full rounded-lg border bg-card text-card-foreground shadow-sm md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tightmd:text-2xl">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
              <Input
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
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button class="w-full" type="submit"> Sign in </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>
