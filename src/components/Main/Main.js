/* eslint-disable */
import React from 'react'
import io from 'socket.io-client'
import randomstring from 'randomstring'
import { Modal } from 'antd'
import baseConfig from '../../baseConfig.json'
import baseData from '../../baseData'
import List from '../List/List'
import ListItem from '../List/ListItem.js'
import ListTitle from '../List/ListTitle.js'
import FileInput from '../FileInput/FileInput.js'
import ClusterResult from '../ClusterResult/ClusterResult'
import styles from './Main.scss'
import unknownImage from '../../static/unknown.jpg'

const { baseURL, baseSocketURL } = baseConfig
const { baseListData } = baseData

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Film Role Recognition',
      imageSource: unknownImage,
      videoSource: '',
      isUploading: false,
      isRunning: false,
      socket: null,
      cluster_data: null,
    }
  }

  componentDidMount() {
    const socket = io.connect(baseSocketURL)

    socket.on('receive_cluster', ({ data }) => {
      this.setState({ cluster_data: data })
      this.checkProgress()
      console.log(data)
    })

    this.setState({ socket })
  }

  checkConnection() {
    const { socket } = this.state

    if (!socket || socket.disconnected) {
      Modal.error({
        title: 'Connection is broken',
        content: 'Please refresh this page.',
        onOk() {
          document.location.reload()
        },
      })
      return false
    }

    return true
  }

  checkProgress() {
    const { cluster_data, isUploading, isRunning } = this.state

    if (isUploading && cluster_data && cluster_data.progress > 0) {
      this.setState({ isUploading: false })
    }

    if (isRunning && cluster_data && cluster_data.progress === 100) {
      this.setState({ isRunning: false })
    }
  }

  selectVideo(name) {
    if (!this.checkConnection()) return

    const { socket } = this.state

    socket.emit('select_video', name)

    this.setState({ cluster_data: null, isRunning: true })
  }

  uploadVideo(videoFileData) {
    if (!this.checkConnection()) return

    const { socket } = this.state

    socket.emit('upload_video', videoFileData)

    this.setState({
      cluster_data: null,
      isRunning: true,
      isUploading: true,
    })
  }

  changeVideoSource(newSource) {
    const { videoSource: currentSource } = this.state
    if (newSource === currentSource) return

    this.setState({ videoSource: newSource })
  }

  render() {
    const {
      title,
      videoSource,
      imageSource,
      cluster_data,
      isUploading,
      isRunning,
    } = this.state

    const info = isUploading ? 'Video uploading, please wait...' : ''

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
                listData={baseListData}
                selectVideo={name => this.selectVideo(name)}
                changeVideoSource={newSource =>
                  this.changeVideoSource(newSource)
                }
                disabled={isRunning}
              />
              <div className={styles.fileInputBar}>
                <FileInput
                  changeVideoSource={newSource =>
                    this.changeVideoSource(newSource)
                  }
                  uploadVideo={videoFileData => this.uploadVideo(videoFileData)}
                  disabled={isRunning}
                />
              </div>
            </div>
            <div className={styles.videoInfoRight}>
              {cluster_data ? (
                <ClusterResult data={cluster_data} />
              ) : (
                <div>{info}</div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p>{title}</p>
        </div>
      </div>
    )
  }
}

export default Main
