import React, { Component } from 'react';
import CustomizedSnackbars from "../errors/errorMessage";

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
     this.setState({
        error: error,
        errorInfo: errorInfo
      });
    }
    
    render() {
      if (this.state.errorInfo) {
        return (
            <CustomizedSnackbars
            variant = "error"
            message = "Les identifiants S3 ne sont pas bons"
          />
        );
      }
      // Render children if there's no error
      return this.props.children;
    }  
  }