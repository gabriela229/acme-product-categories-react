import React, {Component} from 'react';

export default class ErrorBoundary extends Component {
  constructor () {
    super();
    this.state = {
      hasError: false,
      error: ''
    };
  }
  componentDidCatch(error, info) {
    this.setState({hasError: true});
    this.setState({error: error.msg});
    console.log(error, info);
  }
  render(){
    if (this.state.hasError) {
      return (<div className="alert alert-danger">{this.state.error}</div>);
    }
    return this.props.children;
  }
}
