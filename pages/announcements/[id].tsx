import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'

import Loader from '@ui/loader'

import Layout from 'components/layout'
import Card from 'components/card'

import { ComponentType, Announcement } from 'components/card/types'

const ANNOUNCEMENT_QUERY = gql`
  query announcement($id: Int!) {
    announcement(id: $id) {
      id
      type: __typename
      fellowship
      title
      body
      created_ts
    }
  }
`

type QueryData = {
  announcement: Announcement
}

type QueryVars = {
  id: number
}

export default function AnnouncementPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    ANNOUNCEMENT_QUERY,
    {
      skip: !query.id,
      variables: { id: Number(query.id) },
    }
  )

  const announcement = data?.announcement

  if (loading) return <Loader centered />

  if (!announcement || error) {
    return null
  }

  const { id, type, fellowship, title, body, created_ts } = announcement
  return (
    <Layout showBackLink>
      <Card data={{ ...announcement }} componentPlace="page" />
    </Layout>
  )
}
