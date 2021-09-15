import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Layout from 'components/layout'
import Card from 'components/card'

import Loader from '@ui/loader'

import { ComponentType, Fellowship, Project } from 'components/card/types'

const USER_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      created_ts
      avatar_url
      projects {
        id
        type: __typename
        name
        image_url: icon_url
      }
    }
  }
`

type QueryData = {
  user: User
}

type QueryVars = {
  id: number
}

type User = {
  id: number
  type: ComponentType
  name: string
  bio: string
  fellowship: Fellowship
  avatar_url: string
  projects: Project[]
  created_ts: Date
}

export default function UserPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(USER_QUERY, {
    skip: !query.id,
    variables: { id: Number(query.id) },
  })
  const user = data?.user

  if (loading) return <Loader centered />

  if (!user || error) {
    return null
  }

  const { id, type, name, bio, fellowship, avatar_url, projects, created_ts } =
    user
  return (
    <Layout showBackLink>
      <Card
        componentPlace="page"
        data={{
          id: id,
          type: type,
          title: name,
          body: bio,
          fellowship: fellowship,
          created_ts: created_ts,
          image_url: avatar_url,
          projects: projects,
        }}
      />
    </Layout>
  )
}
