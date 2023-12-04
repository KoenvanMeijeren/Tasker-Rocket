import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorCard from './ErrorCard';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    handleDismiss = () => {
        this.setState({ hasError: false });
    };

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;
        if (hasError) {
            const errormessage = error?.message ?? 'Unknown error';
            return ErrorCard(errormessage);
        }
        return children;
    }
}

export default ErrorBoundary;
