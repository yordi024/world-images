import { ref } from 'vue'
import { useRaceStore } from '@/stores/race.store'
import { storeToRefs } from 'pinia'
import type { Seller } from '../types'
import { useSearch } from '.'

export const useRace = function () {
  const raceStore = useRaceStore()

  const { startRace, fetchSellers, addPoints } = raceStore

  const { race } = storeToRefs(raceStore)

  const { clearResult } = useSearch()

  function chooseSellerImage(seller: Seller) {
    addPoints(seller.id, 3)
    clearResult()

    // TODO: Notify the user
  }

  return {
    race,
    startRace,
    fetchSellers,
    chooseSellerImage,
  }
}
