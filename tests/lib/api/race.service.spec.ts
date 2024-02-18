import { describe, it, expect, beforeEach, vi } from 'vitest'
import { RaceApiService } from '@/lib/api/race.service'

describe('RaceApiService', () => {
  let raceService: RaceApiService

  beforeEach(() => {
    raceService = new RaceApiService()
  })

  it('should fetch sellers successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Seller One' }]
    vi.spyOn(raceService, 'get').mockResolvedValue({ data: mockResponse })

    const response = await raceService.getSellers()

    expect(response).toEqual(mockResponse)
  })

  it('should handle fetch sellers error', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    vi.spyOn(raceService, 'get').mockRejectedValue(new Error('Fetch failed'))

    const response = await raceService.getSellers()

    expect(response).toBeUndefined()
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should create an invoice successfully', async () => {
    const mockResponse = { id: 1, prize: 'Prize One' }
    const invoiceData = {
      client: 'Client One',
      seller: 'Seller One',
      items: [{ item: 'Item One', quantity: 1 }],
    }
    vi.spyOn(raceService, 'post').mockResolvedValue({ data: mockResponse })

    const response = await raceService.createInvoice(invoiceData)

    expect(response).toEqual(mockResponse)
  })

  it('should handle create invoice error', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    const invoiceData = {
      client: 'Client One',
      seller: 'Seller One',
      items: [{ item: 'Item One', quantity: 1 }],
    }
    vi.spyOn(raceService, 'post').mockRejectedValue(new Error('Creation failed'))

    const response = await raceService.createInvoice(invoiceData)

    expect(response).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error))
  })
})
