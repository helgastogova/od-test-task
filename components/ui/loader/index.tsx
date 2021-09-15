import cx from 'classnames'

import styles from './loader.module.css'

type LoaderProps = {
  centered?: boolean
}

const Loader: React.FC<LoaderProps> = ({ centered }) => (
  <div className={cx(styles.loader, centered && styles.centered)}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
)

export default Loader
