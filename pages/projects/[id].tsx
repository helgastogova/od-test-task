import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Layout from 'components/layout'
import Card from 'components/card'

import Loader from '@ui/loader'

import { ComponentType, User } from 'components/card/types'

const PROJECT_QUERY = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      type
      name
      description
      icon_url
      created_ts
      users {
        id
        type: __typename
        name
        image_url: avatar_url
      }
    }
  }
`

type QueryData = {
  project: Project
}

type QueryVars = {
  id: number
}

type Project = {
  id: number
  type: ComponentType
  name: string
  description: string
  icon_url: string
  users: User[]
  created_ts: Date
}

export default function ProjectPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    PROJECT_QUERY,
    {
      skip: !query.id,
      variables: { id: Number(query.id) },
    }
  )
  const project = data?.project

  if (loading) return <Loader centered />

  if (!project || error) {
    return null
  }

  const { id, type, name, description, icon_url, users, created_ts } = project
  return (
    <Layout showBackLink>
      <Card
        componentPlace="page"
        data={{
          id: id,
          type: type,
          title: name,
          body: description,
          created_ts: created_ts,
          image_url: icon_url,
          users: users,
        }}
      />
    </Layout>
  )
}
