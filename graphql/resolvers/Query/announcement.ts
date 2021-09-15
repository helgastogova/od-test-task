import db, { AnnouncementRow } from '../../db'

type Args = {
  id: number
}

export default async function announcement(
  parent: unknown,
  { id }: Args
): Promise<AnnouncementRow> {
  const announcement: AnnouncementRow | undefined = await db.getOne(
    'SELECT * FROM announcements WHERE id = ?',
    [id]
  )
  if (!announcement) {
    throw new Error(`Announcement ${id} not found`)
  }
  return announcement
}
