export const dummyInvoice = {
  id: '16',
  date: '2024-02-03',
  dueDate: '2024-02-03',
  datetime: '2024-02-03 23:38:52',
  client: {
    id: '2',
    name: 'Consumidor final',
  },
  numberTemplate: {
    id: '1',
    formattedNumber: '0000001',
  },
  total: 100,
  seller: {
    id: 1,
    name: 'Test 1',
  },
  items: [
    {
      name: 'Images Pack',
      price: 10,
      quantity: 10,
      id: 1,
      total: 100,
    },
  ],
}

export const dummySellers = [
  {
    id: 1,
    name: 'Test 1',
  },
  {
    id: 2,
    name: 'Test 2',
  },
]

export const dummyScoreboard = {
  1: 10,
  2: 5,
}

export const dummyImagesResult = [
  {
    id: 1,
    tags: 'test,demo',
    webformatURL: 'demo.jpg',
  },
  {
    id: 2,
    tags: 'test2,demo2',
    webformatURL: 'demo2.jpg',
  },
]
