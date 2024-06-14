export interface TravelType {
  id: number
  picture: string
  name: string
  departure: string
  return: string
  description: string
  price: number
  score: number
}

export interface TravelTypeUpload extends Omit<TravelType, 'picture'> {
  picture: File
}
