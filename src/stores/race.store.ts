import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { RACE_KEY, PARTICIPANTS_KEY, RACE_STARTED } from '@/lib/constants'
import type { Seller, Race } from '@/lib/types'

export const useRaceStore = defineStore('race', () => {
  const race = useStorage<Race>(RACE_KEY, { status: 'no-started', totalPoints: 0, scoreboard: {} })

  const sellers = useStorage<Seller[]>(PARTICIPANTS_KEY, [])

  async function fetchSellers() {
    if (race.value.status === RACE_STARTED) return

    await new Promise((resolve) => setTimeout(resolve, 1000))

    sellers.value.push(
      {
        id: 1,
        name: 'Pedro Perez',
        identification: null,
        observations: null,
        status: 'active',
      },
      {
        id: 2,
        name: 'Miguel Perez',
        identification: null,
        observations: null,
        status: 'active',
      },
    )
  }

  function startRace() {
    race.value.status = RACE_STARTED
    for (const seller of sellers.value) {
      race.value.scoreboard[seller.id] = 0
    }
  }

  function addPoints(sellerId: number, points: number) {
    race.value.scoreboard[sellerId] += points
    race.value.totalPoints += points
  }

  return {
    race,
    sellers,
    fetchSellers,
    startRace,
    addPoints,
  }
})
