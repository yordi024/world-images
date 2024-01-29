import { useRaceStore } from '@/stores/race.store'
import { storeToRefs } from 'pinia'
import type { Seller, Winner } from '../types'
import { RACE_LIMIT_POINTS, RACE_LIKE_POINTS, RACE_COMPLETED } from '../constants'
import { useSearch } from '.'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'

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
    verifyRaceScores(seller)
  }

  function getFirstPlace() {
    const { scoreboard } = race.value
    const sortedScoreboard = Object.entries(scoreboard).sort(([, a], [, b]) => b - a)

    return sortedScoreboard[0]
  }

  function verifyRaceScores(seller: Seller) {
    const firstPlace = getFirstPlace()

    if (firstPlace[1] >= RACE_LIMIT_POINTS) {
      finishRace()
      notifySuccess('The race is over!')
      return
    }

    notifySuccess('Points added!', `+3 points given to ${seller.name}.`)
  }

  async function handleAwardPrize() {
    if (!firstPlaceScore.value || !firstPlaceScore.value?.seller?.id) return

    generatingInvoice.value = true

    const { seller } = firstPlaceScore.value

    await generaTePrize(seller)
    notifySuccess('Invoice Generated!', `The prize for ${seller.name} has been generated.`)
    generatingInvoice.value = false
  }

  function notifySuccess(title: string, description?: string) {
    toast.success(title, {
      description,
      duration: 5000,
    })
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
