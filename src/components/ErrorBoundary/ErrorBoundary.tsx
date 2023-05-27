import React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) {
      return (
        <div className={styles['error-boundary']}>
          <p className={styles.text}> {fallback}</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
