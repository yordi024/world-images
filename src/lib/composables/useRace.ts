import { useRaceStore } from '@/stores/race.store'
import { storeToRefs } from 'pinia'
import type { Seller, Winner } from '../types'
import { RACE_LIMIT_POINTS, RACE_LIKE_POINTS, RACE_COMPLETED } from '../constants'
import { useSearch } from '.'
import { computed, ref } from 'vue'

export const useRace = function () {
  const raceStore = useRaceStore()

  const {
    startRace,
    finishRace,
    fetchSellers,
    addPoints,
    getSellerById,
    generaTePrize,
    resetRaceState,
  } = raceStore

  const { race, sellers, sellerScoreboard, prize } = storeToRefs(raceStore)

  const { clearResult } = useSearch()

  const generatingInvoice = ref(false)

  const firstPlaceScore = computed<Winner | null>(() => {
    if (race.value.status !== RACE_COMPLETED) return null

    const firstPlace = getFirstPlace()

    return {
      seller: getSellerById(Number(firstPlace[0])),
      score: firstPlace[1],
      totalPoints: race.value.totalPoints,
    }
  })

  function handleFavoriteImage(seller: Seller) {
    addPoints(seller.id, RACE_LIKE_POINTS)
    clearResult()

    // TODO: Notify the user
    verifyRaceScores()
  }

  function getFirstPlace() {
    const { scoreboard } = race.value
    const sortedScoreboard = Object.entries(scoreboard).sort(([, a], [, b]) => b - a)

    return sortedScoreboard[0]
  }

  function verifyRaceScores() {
    const firstPlace = getFirstPlace()

    if (firstPlace[1] >= RACE_LIMIT_POINTS) {
      finishRace()
    }
  }

  async function handleAwardPrize() {
    if (!firstPlaceScore.value || !firstPlaceScore.value?.seller?.id) return

    generatingInvoice.value = true

    await generaTePrize(firstPlaceScore.value.seller)

    generatingInvoice.value = false
  }

  return {
    race,
    sellers,
    firstPlaceScore,
    prize,
    generatingInvoice,
    startRace,
    resetRaceState,
    fetchSellers,
    handleFavoriteImage,
    handleAwardPrize,
    sellerScoreboard,
  }
}
