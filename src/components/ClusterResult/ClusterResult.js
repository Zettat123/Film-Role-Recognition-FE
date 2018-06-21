/* eslint-disable */
import React from 'react'
import cx from 'classnames'
import { Progress } from 'antd'
import ClusterItem from './ClusterItem'
import styles from './ClusterResult.scss'

class ClusterResult extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foo: 'bar',
    }
  }

  render() {
    const { className, data } = this.props
    const { progress, clusters } = data

    const clusterKeys = clusters ? Object.keys(clusters) : []

    return (
      <div className={cx(className, styles.root)}>
        <div className={styles.progressBar}>
          <Progress percent={progress} />
        </div>

        <div className={styles.clusterList}>
          {clusterKeys.map(item => (
            <ClusterItem
              className={styles.clusterItem}
              number={item}
              key={item}
              {...clusters[item]}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ClusterResult
