export interface ArtistSearchResult {
  artistName: string
  imageUrl: string
  activityPeriod: string
  activityYears: string
  country: string
  genre: string
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