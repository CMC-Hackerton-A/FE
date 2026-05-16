export interface ArtistSearchResult {
  artistId: number
  artistName: string
  imageUrl: string
  activityPeriod: string
  activityYears: string
  country: string
  genre: string
}

export interface TopArtistResponse {
  artistId: number
  artistName: string
  imageUrl: string
  activityPeriod: string
  activityYears: string
  starCount: number
}

export interface DetailResponse {
  artistId: number
  artistName: string
  imageUrl: string
  genre: string
  country: string
  activityPeriod: string
  activityYears: string
  starCount: number
}

export interface CreateArtistRequest {
  mbid?: string
  name?: string
  beginYear?: number
  endYear?: number
  country?: string
  genre?: string
  starCount?: number
  artistImageUrl?: string
}