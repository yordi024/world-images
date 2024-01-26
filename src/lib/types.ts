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
