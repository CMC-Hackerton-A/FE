export interface LastAlbumInfo {
  id: number
  name: string
  coverUrl: string
  releaseDate: string
}

export interface LastTrackInfo {
  id: number
  name: string
  coverUrl: string
  releaseDate: string
}

export interface LastAlbumAndTrackResponse {
  lastAlbum: LastAlbumInfo
  lastTrack: LastTrackInfo
}