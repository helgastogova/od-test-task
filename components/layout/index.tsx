import Link from 'next/link'
import styles from './layout.module.css'

interface LayoutProps {
  children?: React.ReactNode
  showBackLink?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, showBackLink = false }) => {
  if (!children) return null
  return (
    <div className={styles.root}>
      {showBackLink && (
        <div className={styles.link}>
          <Link href="/">Back to main page</Link>
        </div>
      )}
      <div className={styles.main}>{children}</div>
    </div>
  )
}

export default Layout
