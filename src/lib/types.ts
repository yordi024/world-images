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

export interface Winner {
  seller: Seller
  score: number
  totalPoints: number
}

export interface InvoicePrize {
  id: string
  date: string
  dueDate: string
  datetime: string
  observations?: string
  anotation?: string
  termsConditions: string
  status: string
  client: Client
  numberTemplate: NumberTemplate
  subtotal: number
  total: number
  decimalPrecision: string
  seller: Seller
  payments: Payment[]
  items: InvoiceItem[]
}

export interface Client {
  id: string
  name: string
  identification: string
}

export interface InvoiceItem {
  name: string
  description?: string
  price: number
  discount: number
  reference?: string
  quantity: number
  id: number
  unit: string
  itemType: string
  tax: any[]
  total: number
}

export interface NumberTemplate {
  id: string
  prefix: any
  number: string
  text: any
  documentType: string
  fullNumber: string
  formattedNumber: string
}
