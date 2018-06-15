/* eslint-disable */
import React from 'react'
import io from 'socket.io-client'
import baseConfig from '../baseConfig'

const { baseURL } = baseConfig

class TestSocket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'TestSocket',
      socket: null,
      image: '',
    }
  }

  componentDidMount() {
    const socket = io.connect('ws://127.0.0.1:5000')

    this.setState({ socket })

    socket.on('receive_info', data => {
      console.log(new Date() + ' %o', data)

      this.setState({ image: data.data[-1].image })
    })

    socket.on('connect', () => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAA')
      socket.emit('start')
    })
  }

  render() {
    const { image } = this.state
    return (
      <div>
        <img src={`data:image/jpg;base64,${image}`} />
      </div>
    )
  }
}

export default TestSocket
