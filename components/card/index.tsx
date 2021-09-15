import Text from '@ui/text'
import Link from 'next/link'
import Label from '@ui/label'

import SmallItem from './smallItem'

import { CardComponentProps } from './types'

import styles from './card.module.css'

const Card: React.FC<CardComponentProps> = ({
  componentPlace = 'page',
  data: {
    id,
    type,
    title,
    body,
    fellowship,
    created_ts,
    image_url,
    projects,
    users,
  },
}) => {
  const smallItems = [...(projects || []), ...(users || [])]

  return (
    <div className={styles.root}>
      <Label className={styles.fellowship}>
        {type} / {fellowship && <>{fellowship} /</>} {created_ts}
      </Label>

      <div className={styles.columns}>
        {image_url && (
          <div className={styles.left}>
            <img className={styles.img} src={image_url} />
          </div>
        )}

        <div className={image_url ? styles.right : ''}>
          <Text bold size="18" tagName="h2">
            {componentPlace === 'listing' ? (
              <Link href={`${type.toLowerCase()}s/${id}`}>{title}</Link>
            ) : (
              <>{title}</>
            )}
          </Text>

          <Text markedText={body} />
          {smallItems.map((item) => {
            return (
              <SmallItem
                key={item.id}
                id={item.id}
                url={item.image_url}
                name={item.name}
                type={`${item.type.toLowerCase()}s`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
