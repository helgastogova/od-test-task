import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import InfiniteScroll from 'react-infinite-scroll-component'

import Link from 'next/link'
import Text from '@ui/text'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import { QUERY } from './query'

import { QueryData, QueryVariables, Fellowships } from './types'

import Loader from '@ui/loader'
import Layout from 'components/layout'
import Card from 'components/card'

import { fellowships } from './constants'

import styles from './feed.module.css'

import { Fellowship } from 'components/card/types'

const Feed: FC = () => {
  const router = useRouter()

  const [feedType, setFeedType] = useState<string>('all')
  const [feedState, setFeedState] = useState<{
    offset: number
    hasMore: boolean
  }>({
    offset: 0,
    hasMore: true,
  })

  useEffect(() => {
    if (!router.isReady) return

    const {
      query: { type },
    } = router

    const typeFromUrl: string = router.query.type as string || 'all'

    setFeedType(typeFromUrl)
  }, [router.isReady])

  const handleOnChange = (value: string): void => {
    setFeedType(value)
    setFeedState({
      offset: 0,
      hasMore: true,
    })
    router.push(`/?type=${value}`)
  }

  const { offset, hasMore } = feedState
  const { data, error, loading, fetchMore } = useQuery<
    QueryData,
    QueryVariables
  >(QUERY, {
    variables: {
      offset: 0,
      feedType: feedType,
    },
  })

  if (!data || error) {
    return null
  }
  const { feed } = data

  return (
    <>
      <InfiniteScroll
        dataLength={feed.length}
        next={() =>
          fetchMore({
            variables: {
              offset: feed.length,
              feedType: feedType,
            },
          }).then((res) => {
            const {
              data: { feed },
            } = res
            setFeedState({
              offset: offset + feed.length,
              hasMore: !!feed.length,
            })
          })
        }
        hasMore={hasMore}
        loader={<Loader centered />}
        scrollableTarget="scrollableDiv"
      >
        <div className={styles.switcher}>
          {fellowships.map((item, key) => {
            return (
              <div
                className={cx(styles.item, item === feedType && styles.active)}
                onClick={() => handleOnChange(item)}
                key={key}
              >
                {item}
              </div>
            )
          })}
        </div>
        {loading ? (
          <Loader />
        ) : (
          feed.map((item, key) => {
            return <Card key={key} data={item} componentPlace="listing" />
          })
        )}
      </InfiniteScroll>
    </>
  )
}

export default Feed
