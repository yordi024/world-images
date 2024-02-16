<template>
  <Dialog v-model:open="open">
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Alegra Invoice</DialogTitle>
        <DialogDescription> The prize of the winner. </DialogDescription>
      </DialogHeader>
      <div
        v-if="Object.keys(invoice).length"
        class="w-full bg-card border rounded-md shadow-md px-6 py-8 max-w-md mx-auto"
      >
        <h1 class="font-bold text-2xl text-center text-primary">Alegra</h1>
        <hr class="my-5" />
        <div class="flex justify-between mb-6">
          <h1 class="text-lg font-bold">Invoice</h1>
          <div class="text-muted-foreground">
            <div>Date: {{ invoice.date }}</div>
            <div>Invoice #: {{ invoice.numberTemplate.formattedNumber }}</div>
          </div>
        </div>
        <div class="mb-8">
          <h2 class="text-lg font-bold mb-4">Seller:</h2>
          <div class="text-muted-foreground mb-2">{{ invoice.seller.name }}</div>
        </div>
        <div class="mb-8">
          <h2 class="text-lg font-bold mb-4">Bill To:</h2>
          <div class="text-muted-foreground mb-2">{{ invoice.client.name }}</div>
        </div>
        <table class="w-full mb-8">
          <thead>
            <tr>
              <th class="w-[40%] text-left font-bold text-muted-foreground">Product</th>
              <th class="text-right font-bold text-muted-foreground">Quantity</th>
              <th class="text-right font-bold text-muted-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in invoice.items" :key="item.id">
              <td class="text-left text-muted-foreground">{{ item.name }}</td>
              <td class="text-right text-muted-foreground">{{ item.quantity }}</td>
              <td class="text-right text-muted-foreground">${{ item.total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-left font-bold text-muted-foreground">Total</td>
              <td class="text-right font-bold text-muted-foreground">{{ totalItem }}</td>
              <td class="text-right font-bold text-muted-foreground">${{ invoice.total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="text-muted-foreground mb-2">Thank you for your participation!</div>
      </div>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRace } from '@/lib/composables'
import type { InvoicePrize } from '@/lib/types'
import { computed, type Ref } from 'vue'

const open = defineModel<boolean>()

const { prize: invoice }: { prize: Ref<InvoicePrize> } = useRace()

const totalItem = computed(() => {
  if (!invoice.value) return 0

  return invoice.value.items
    .flatMap((item) => item.quantity)
    .reduce((total: number, quantity: number) => quantity + total, 0)
})
</script>
