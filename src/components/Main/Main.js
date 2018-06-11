/* eslint-disable */
import React from 'react'
import randomstring from 'randomstring'
import baseConfig from '../../baseConfig'
import List from '../List/List'
import ListItem from '../List/ListItem.js'
import ListTitle from '../List/ListTitle.js'
import FileInput from '../FileInput/FileInput.js'
import styles from './Main.scss'
import unknownImage from '../../static/unknown.jpg'
import George_Clooney from '../../static/George_Clooney.mp4'
import ss1 from '../../static/1.JPG'

const { baseURL } = baseConfig

const listData = [
  {
    title: 'George_Clooney.mp4',
    name: 'George_Clooney',
    image: ss1,
    video: George_Clooney,
  },
]

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Film Role Recognition',
      imageSource: unknownImage,
      videoSource: '',
    }
  }

  changeVideoSource(newSource) {
    const { videoSource: currentSource } = this.state
    if (newSource === currentSource) return

    this.setState({ videoSource: newSource }, () =>
      this.setState({
        imageSource: `${baseURL}/cluster_result/${randomstring.generate(6)}`,
      })
    )
  }

  render() {
    const { videoSource, imageSource } = this.state

    return (
      <div className={styles.root}>
        <div className={styles.titleBar}>{this.state.title}</div>
        <div className={styles.content}>
          <div className={styles.videoInfo}>
            <div className={styles.videoInfoLeft}>
              <video
                className={styles.videoPlayer}
                src={videoSource}
                autoPlay={videoSource !== ''}
                controls
              />
              <List
                className={styles.videoList}
                listTitle="Select a video"
                listData={listData}
                changeVideoSource={newSource =>
                  this.changeVideoSource(newSource)
                }
              />
              <div className={styles.fileInputBar}>
                <FileInput
                  changeVideoSource={newSource =>
                    this.changeVideoSource(newSource)
                  }
                />
              </div>
            </div>
            <div className={styles.videoInfoRight}>
              <img className={styles.resultImage} src={imageSource} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p>Footer Content</p>
        </div>
      </div>
    )
  }
}

export default Main
