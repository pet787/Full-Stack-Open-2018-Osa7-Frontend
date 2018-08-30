import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification
    if (notification === null) return null
    if (notification.type === 'info' ) {
      return (
        <div>
          <Alert bsStyle="info"> {notification.message} </Alert>
        </div>
      )
    }
    if (notification.type === 'error' ) {
      return (
        <div>
          <Alert bsStyle="danger"> {notification.message} </Alert>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)
