'use client'; // Required for React component boundaries in app directory

import React from 'react';
import { Toast } from '../toast';

class ErrorBoundary extends React.Component {
  constructor({ component, fallback }) {
    super()
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    Toast.error(`Component ${component} failed to render`)
  }

  render() {
    if (this.state.hasError) return fallback

    return this.props.children;
  }
}

export default ErrorBoundary;
