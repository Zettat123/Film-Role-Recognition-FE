/* eslint-diable */
import React from 'react'
import cx from 'classnames'
import styles from './ListTitle.scss'

const ListTitle = ({ className, listTitle }) => (
  <div className={cx(className, styles.root)}>
    <div>{listTitle}</div>
  </div>
)

export default ListTitle
