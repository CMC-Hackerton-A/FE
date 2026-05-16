export const ALBUM_KEYS = {
  LAST: (artistId: number) => ['album', 'last', artistId] as const,
} as const