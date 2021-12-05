import React from 'react';

import { Error, ErrorProps } from './Error';

interface ErrorBoundaryProps extends ErrorProps {}

interface ErrorBoundaryState {
  error: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: error };
  }

  //   componentDidCatch(error, info) {
  //     // Log the error to an error reporting service
  //     logErrorToMyService(error, info)
  //   }

  render(): React.ReactNode {
    if (this.state.error) {
      return <Error errorText={this.props.errorText} />;
    }
    return this.props.children;
  }
}
