import { RACE_NO_STARTED, RACE_STARTED, RACE_COMPLETED } from './constants'
export interface ImageResult {
  id: number
  pageURL: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
}

export interface Seller {
  id: number
  name: string
  identification: any
  observations: any
  status: string
}

export interface SellerImage {
  seller: Seller
  image: ImageResult
}

export type RaceStatus = typeof RACE_NO_STARTED | typeof RACE_STARTED | typeof RACE_COMPLETED

export type Scoreboard = { [key in string]: number }
export interface Race {
  status: RaceStatus
  totalPoints: number
  scoreboard: Scoreboard
}
