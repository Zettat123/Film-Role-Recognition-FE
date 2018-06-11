import axios from 'axios'
import baseConfig from './baseConfig'

const { baseURL } = baseConfig

const selectVideo = videoname =>
  axios.post(`${baseURL}/selectVideo`, { videoname })

const uploadVideo = data =>
  axios({
    method: 'post',
    url: `${baseURL}/upload`,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export { selectVideo, uploadVideo }
