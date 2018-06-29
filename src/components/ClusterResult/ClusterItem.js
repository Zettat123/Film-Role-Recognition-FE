/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import styles from './ClusterItem.scss'

const ClusterItem = ({ className, number, frequency, image, name }) => (
  <div className={cx(className, styles.root)}>
    <div className={styles.cluserInfo}>
      <div className={styles.clusterNumber}>{`Cluster No. ${number}`}</div>
      <div className={styles.clusterName}>{name}</div>
      <div>{`Frequency: ${frequency.toFixed(2)}%`}</div>
    </div>
    <img src={`data:image/jpg;base64,${image}`} />
  </div>
)

export default ClusterItem
