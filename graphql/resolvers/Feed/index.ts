import db, { FeedItemRow } from '../../db'

export function __resolveType(data: FeedItemRow): string | null {
  if (!data) return null
  return data.type || null
}
