import React from 'react'

class ErrorBoundary extends React.Component {

  constructor() {
    super()
    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error) {
    return {hasErrored: true}
  }

  componentDidCatch(error, info) {
    console.log('error boundary', error)
    console.log(info)
  }

  render() {
    if(this.state.hasErrored) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children
  }
}

export default ErrorBoundary