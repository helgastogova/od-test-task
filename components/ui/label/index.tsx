import cx from 'classnames'

import styles from './label.module.css'

interface LabelProps {
  children?: React.ReactNode
  className?: string
}

const Label: React.FC<LabelProps> = ({ children, className }) => {
  if (!children) return null
  return <div className={cx(styles.root, className)}>{children}</div>
}

export default Label
