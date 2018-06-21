/* eslint-disable */
import React from 'react'
import io from 'socket.io-client'
import randomstring from 'randomstring'
import baseConfig from '../../baseConfig'
import List from '../List/List'
import ListItem from '../List/ListItem.js'
import ListTitle from '../List/ListTitle.js'
import FileInput from '../FileInput/FileInput.js'
import ClusterResult from '../ClusterResult/ClusterResult'
import styles from './Main.scss'
import unknownImage from '../../static/unknown.jpg'

const { baseURL, baseSocketURL, baseData } = baseConfig

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Film Role Recognition',
      imageSource: unknownImage,
      videoSource: '',
      socket: null,
      cluster_data: null,
    }
  }

  componentDidMount() {
    const socket = io.connect(baseSocketURL)

    this.setState({ socket })
  }

  selectVideo(name) {
    const { socket } = this.state
    socket.on('receive_cluster', ({ data }) => {
      this.setState({ cluster_data: data })
      console.log(data)
    })
    socket.emit('select_video', name)
  }

  changeVideoSource(newSource) {
    const { videoSource: currentSource } = this.state
    if (newSource === currentSource) return
  }

  render() {
    const { videoSource, imageSource, cluster_data } = this.state

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
                listData={baseData}
                selectVideo={name => this.selectVideo(name)}
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
              {cluster_data ? (
                <ClusterResult data={cluster_data} />
              ) : (
                <div>Loading...</div>
              )}
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
