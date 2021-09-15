import React, { forwardRef, HTMLAttributes } from 'react'
import cx from 'classnames'
import marked from 'marked'

import styles from './text.module.css'

import { Size, Color } from '../types'

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  bold?: boolean
  align?: 'center' | 'right'
  tagName?: 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
  size?: Size
  children?: React.ReactNode
  color?: Color
  markedText?: string
}

const Text: React.FC<TextProps> = ({
  align = 'left',
  bold,
  tagName: Component = 'p',
  size,
  className,
  children,
  color,
  markedText,
}) => {
  if (!children && !markedText) return null

  return (
    <Component
      className={cx(
        align && styles[`align-${align}`],
        bold && styles.bold,
        size && styles[`size-${size}`],
        color && styles[`color-${color}`],
        className
      )}
    >
      {markedText ? (
        <span dangerouslySetInnerHTML={{ __html: marked(markedText) }} />
      ) : (
        children
      )}
    </Component>
  )
}
export default Text
