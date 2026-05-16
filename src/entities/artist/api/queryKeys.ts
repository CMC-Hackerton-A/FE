export const ARTIST_KEYS = {
  ALL: ['artist'] as const,
  TOP: ['artist', 'top'] as const,
  DETAIL: (artistId: number) => ['artist', 'detail', artistId] as const,
  SEARCH: (q: string) => ['artist', 'search', q] as const,
} as const