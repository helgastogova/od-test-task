import Link from 'next/link'

import styles from './smallItem.module.css'

type SmallItemProps = {
  id: number
  url: string
  name: string
  type: string
}

const SmallItem: React.FC<SmallItemProps> = ({ id, url, name, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img className={styles.avatar} src={url} />
      </div>
      <div className={styles.right}>
        <Link href={`/${type}/${id}`}>{name}</Link>
      </div>
    </div>
  )
}

export default SmallItem
