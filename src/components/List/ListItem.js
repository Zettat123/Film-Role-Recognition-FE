/* eslint-disable */
import React from 'react'
import cx from 'classnames'
// import { selectVideo } from '../../requests'
import styles from './ListItem.scss'

class ListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isHover: false,
    }
  }

  handleClick() {
    const { selectVideo, changeVideoSource, video, name } = this.props

    selectVideo(name)
    changeVideoSource(video)
    // selectVideo(name).then(() => changeVideoSource(video))
  }

  render() {
    const { isHover } = this.state
    const { className, title, image } = this.props

    return (
      <div
        className={cx(className, styles.root)}
        onClick={() => this.handleClick()}
      >
        <img className={styles.image} src={image} alt="Thumbnail" />
        <div className={styles.title}>{title}</div>
      </div>
    )
  }
}

export default ListItem
