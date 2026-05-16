export const ARTIST_KEYS = {
  ALL: ['artist'] as const,
  SEARCH: (q: string) => ['artist', 'search', q] as const,
} as const