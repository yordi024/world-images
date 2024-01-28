import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import {
  RACE_KEY,
  PARTICIPANTS_KEY,
  RACE_STARTED,
  RACE_COMPLETED,
  RACE_NO_STARTED,
  PRICE_KEY,
} from '@/lib/constants'
import type { Seller, Race, InvoicePrize } from '@/lib/types'
import { computed } from 'vue'
import { RaceApiService } from '@/lib/api/race.service'

export const useRaceStore = defineStore('race', () => {
  const race = useStorage<Race>(RACE_KEY, {
    status: RACE_NO_STARTED,
    totalPoints: 0,
    scoreboard: {},
  })
  const prize = useStorage<InvoicePrize>(PRICE_KEY, null)
  const sellers = useStorage<Seller[]>(PARTICIPANTS_KEY, [])

  const sellerScoreboard = computed(() => {
    return sellers.value
      .map((seller) => {
        return {
          seller,
          points: race.value.scoreboard[seller.id] || 0,
        }
      })
      .sort((a, b) => b.points - a.points)
  })

  async function fetchSellers() {
    if (race.value.status !== RACE_NO_STARTED) return

    sellers.value = []

    const service = new RaceApiService()

    const data = await service.getSellers()

    sellers.value = [...data]
  }

  function startRace() {
    race.value.status = RACE_STARTED
    race.value.totalPoints = 0
    race.value.scoreboard = {}
    for (const seller of sellers.value) {
      race.value.scoreboard[seller.id] = 0
    }
  }

  function resetRaceState() {
    race.value.status = RACE_NO_STARTED
    race.value.totalPoints = 0
    race.value.scoreboard = {}
    prize.value = null
  }

  function finishRace() {
    race.value.status = RACE_COMPLETED
  }

  function addPoints(sellerId: number, points: number) {
    race.value.scoreboard[sellerId] += points
    race.value.totalPoints += points
  }

  function getSellerById(id: number) {
    return sellers.value.find((seller) => seller.id === id)
  }

  async function generaTePrize() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    prize.value = {}
  }

  function clearState() {
    sellers.value = []
    race.value = null
    prize.value = null
  }

  return {
    race,
    sellers,
    sellerScoreboard,
    fetchSellers,
    startRace,
    resetRaceState,
    finishRace,
    addPoints,
    getSellerById,
    generaTePrize,
    clearState,
  }
})
