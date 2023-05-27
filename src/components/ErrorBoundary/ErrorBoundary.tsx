import React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, message: error.message });
  }

  public render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) {
      return (
        <div className={styles['error-boundary']}>
          <p className={styles.text}>
            {fallback} <br />
            <br />
            <span className={styles.error}>Error information: {this.state.message}</span>
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
