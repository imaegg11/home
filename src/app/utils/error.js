'use client'; // Required for React component boundaries in app directory

import React from 'react';
import { Toast } from './toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const { component } = this.props;
    Toast.error(`Component ${component} failed to render`)
  }

  render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) return fallback

    return children;
  }
}

export default ErrorBoundary;
