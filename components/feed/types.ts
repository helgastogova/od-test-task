import { CardType } from 'components/card/types'
export type Fellowships = 'founders' | 'angels' | 'writers' | 'all'
export type AnnouncementType = {
  id: number
  type: 'Announcement'
  fellowship: Fellowships
  title: string
  body: string
  created_ts: Date
}

export type ProjectType = {
  id: number
  name: string
  type: 'Project'
  description: string
  icon_url: string
  created_ts: Date
  users: UserType[]
}

export type UserType = {
  id: number
  name: string
  type: 'User'
  bio: string
  avatar_url: string
  fellowship: string
  created_ts: Date
  projects: ProjectType[]
}

export type QueryData = {
  feed: CardType[]
}

export type QueryVariables = {
  offset: number
  feedType: string
}
