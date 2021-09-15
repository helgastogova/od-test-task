export type Fellowship = 'all' | 'founders' | 'angels' | 'writers'
export type ComponentType = 'Announcement' | 'Project' | 'User'

export type Project = {
  id: number
  name: string
  type: ComponentType
  description: string
  image_url: string
  users: User[]
  created_ts: Date
}

export type Announcement = {
  id: number
  type: ComponentType
  fellowship: Fellowship
  title: string
  body: string
  created_ts: Date
}

export type User = {
  id: number
  type: ComponentType
  image_url: string
  name: string
  fellowship: Fellowship
  bio: string
  projects: Project[]
  created_ts: Date
}

export type CardType = {
  id: number
  type: ComponentType
  title: string
  fellowship?: Fellowship
  body: string
  image_url?: string
  created_ts: Date
  projects?: Project[]
  users?: User[]
}

export type CardComponentProps = {
  componentPlace: 'listing' | 'page'
  data: CardType
}
