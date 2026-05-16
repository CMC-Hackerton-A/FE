export interface MemorialMessage {
  id: number
  content: string
  createdAt: string
  artist_id: number
}

export interface MemorialMessagesResponse {
  messages: MemorialMessage[]
}

export interface CreateMemorialMessageRequest {
  content: string
  artist_id: number
}

export interface CreateMemorialMessageResponse {
  id: number
  content: string
  createdAt: string
  artist_id: number
}