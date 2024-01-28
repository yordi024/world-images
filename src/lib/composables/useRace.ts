import { useRaceStore } from '@/stores/race.store'
import { storeToRefs } from 'pinia'
import type { Seller } from '../types'
import { RACE_LIMIT_POINTS, RACE_LIKE_POINTS, RACE_COMPLETED } from '../constants'
import { useSearch } from '.'
import { computed } from 'vue'

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

  const { race, sellerScoreboard } = storeToRefs(raceStore)

  const { clearResult } = useSearch()

  const firstPlaceScore = computed(() => {
    if (race.value.status !== RACE_COMPLETED) return undefined

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

  function handleAwardPrize() {
    generaTePrize()
  }

  return {
    race,
    firstPlaceScore,
    startRace,
    resetRaceState,
    fetchSellers,
    handleFavoriteImage,
    handleAwardPrize,
    sellerScoreboard,
  }
}
