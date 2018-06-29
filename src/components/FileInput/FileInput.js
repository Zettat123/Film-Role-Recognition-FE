/*eslint-disable*/
import React from 'react'
import { Icon, Modal } from 'antd'
import cx from 'classnames'
import styles from './FileInput.scss'

class FileInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      file: null,
    }
  }

  isFileValid = fileName =>
    fileName.endsWith('.mp4') || fileName.endsWith('.avi')

  showErrorModal() {
    Modal.error({
      title: 'File Extension Error',
      content: 'Only .mp4 or .avi file is allowed',
    })
  }

  handleSelectFile(e) {
    const currentFile = e.target.files[0]
    const { changeVideoSource } = this.props

    const valid = this.isFileValid(currentFile.name)

    if (!valid) {
      this.showErrorModal()
      return
    }

    this.setState(
      {
        file: currentFile,
      },
      () => changeVideoSource(URL.createObjectURL(currentFile))
    )
  }

  uploadFile() {
    const { file } = this.state
    const { uploadVideo } = this.props

    const fileName = file.name.substr(0, file.name.lastIndexOf('.'))
    const fileExtensionName = file.name.substr(
      file.name.lastIndexOf('.') + 1,
      file.name.length - file.name.lastIndexOf('.')
    )

    const videoFileData = {
      file,
      fileName,
      fileExtensionName,
    }

    uploadVideo(videoFileData)

    // let fileFormData = new FormData()
    // fileFormData.append('file', file)
    //
    // uploadVideo(fileFormData)
  }

  deleteFile() {
    const { changeVideoSource } = this.props

    this.setState(
      {
        file: null,
      },
      () => changeVideoSource('')
    )
  }

  render() {
    const { className, disabled } = this.props
    const { file } = this.state

    return (
      <div className={cx(className, styles.root)}>
        <div className={cx(styles.cover, { [styles.disabled]: disabled })} />
        {file === null ? (
          <button
            className={cx(styles.button, styles.select)}
            onChange={e => this.handleSelectFile(e)}
          >
            Select<Icon className={styles.icon} type="file-add" />
            <input className={styles.invisibleFileInput} type="file" />
          </button>
        ) : (
          <div className={styles.buttonGroup}>
            <div
              className={styles.deleteButton}
              onClick={() => this.deleteFile()}
            >
              <Icon type="close-circle" />
            </div>
            <button
              className={cx(styles.button, styles.upload)}
              onClick={() => this.uploadFile()}
            >
              Upload<Icon className={styles.icon} type="upload" />
            </button>
          </div>
        )}
        <div className={styles.fileName}>
          {file ? file.name : 'Please upload a video file'}
        </div>
      </div>
    )
  }
}

export default FileInput
