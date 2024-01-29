<template>
  <Globe2 class="mt-24 text-primary h-20 w-20 mb-5" />
  <div class="w-full max-w-3xl mb-10 text-center">
    <h3 class="text-2xl mb-2">World Images Race</h3>
    <p class="text-muted-foreground text-lg mb-5">
      Discover the beauty of the world and take part in the Alegra grand prize race for world images
      by searching and selecting your favorite pictures.
    </p>

    <div class="w-full flex justify-center mb-5">
      <Collapsible v-model:open="isOpen" class="w-[400px] space-y-2">
        <CollapsibleTrigger as-child>
          <h4 class="text-lg hover:cursor-pointer text-primary font-semibold hover:underline">
            Rules
          </h4>
        </CollapsibleTrigger>
        <CollapsibleContent class="space-y-2 px-5">
          <hr class="my-4" />

          <ul class="pl-4 text-left text-muted-foreground font-medium">
            <li v-for="(rule, key) in rules" :key="key" class="mb-4">
              <span class="text-primary font-medium mr-2">{{ key + 1 }}.</span>{{ rule }}
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>

    <Button :disabled="!sellers.length" @click="startRace"> Start Race </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRace } from '@/lib/composables'
import { Globe2 } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ref } from 'vue'
import { RACE_LIKE_POINTS, RACE_LIMIT_POINTS } from '@/lib/constants'

const { sellers, startRace } = useRace()

const rules = [
  'Enter a keyword.',
  'Sellers display related images.',
  `Select your favorite to award ${RACE_LIKE_POINTS} points.`,
  'Sellers accumulate points for each like.',
  `Race ends when reaching ${RACE_LIMIT_POINTS} points.`,
  'Winner obtains an invoice in Alegra.',
]

const isOpen = ref(false)
</script>
