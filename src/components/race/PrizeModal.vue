<template>
  <Dialog v-model:open="open">
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Alegra Invoice</DialogTitle>
        <DialogDescription> The prize of the winner. </DialogDescription>
      </DialogHeader>
      <div class="w-full bg-card border rounded-md shadow-md px-6 py-8 max-w-md mx-auto">
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
        <div class="text-muted-foreground mb-2">Thank you for your business!</div>
        <div class="text-muted-foreground text-sm">Please remit payment within 30 days.</div>
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
import { ref, computed } from 'vue'

const open = defineModel<boolean>()

const invoice = ref({
  id: '2',
  date: '2024-01-23',
  dueDate: '2024-01-23',
  datetime: '2024-01-23 14:16:31',
  observations: null,
  anotation: null,
  termsConditions: '',
  status: 'closed',
  client: {
    id: '2',
    name: 'Consumidor final',
    identification: '',
    phonePrimary: null,
    phoneSecondary: null,
    fax: null,
    mobile: null,
    email: null,
    address: {
      province: null,
      municipality: null,
      description: '-',
      country: null,
    },
    identificationType: null,
  },
  numberTemplate: {
    id: '2',
    prefix: null,
    number: '2',
    text: null,
    documentType: 'invoice',
    fullNumber: '00000002',
    formattedNumber: '00000002',
  },
  subtotal: 500,
  discount: 0,
  tax: 0,
  total: 500,
  totalPaid: 500,
  balance: 0,
  decimalPrecision: '2',
  warehouse: {
    id: '1',
    name: 'Principal',
  },
  term: 'De contado',
  incomeType: null,
  paymentType: null,
  paymentMethod: null,
  seller: {
    id: 1,
    name: 'Pedro Perez',
    identification: null,
    observations: null,
  },
  priceList: {
    id: 1,
    name: 'General',
  },
  payments: [
    {
      id: '2',
      prefix: null,
      number: '2',
      date: '2024-01-23',
      amount: 500,
      paymentMethod: 'cash',
      observations: null,
      anotation: null,
      status: 'open',
    },
  ],
  items: [
    {
      name: 'Images Pack',
      description: null,
      price: 500,
      discount: 0,
      reference: null,
      quantity: 1,
      id: 1,
      unit: 'PAQ',
      itemType: 'product',
      tax: [],
      total: 500,
    },
  ],
  costCenter: null,
  printingTemplate: {
    id: '1',
    name: 'Clásico',
    pageSize: 'letter',
  },
})

const totalItem = computed(() => {
  return invoice.value.items
    .flatMap((item) => item.quantity)
    .reduce((total: number, quantity: number) => quantity + total, 0)
})
</script>
