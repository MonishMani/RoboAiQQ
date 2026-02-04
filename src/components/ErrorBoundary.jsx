import React from 'react';

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('ErrorBoundary caught an error:', error, errorInfo);
        }

        // You can also log the error to an error reporting service here
        // Example: logErrorToService(error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: '2rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '600px',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            padding: '3rem',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                            ⚠️ Oops!
                        </h1>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600' }}>
                            Something went wrong
                        </h2>
                        <p style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.9 }}>
                            We're sorry for the inconvenience. An unexpected error occurred while loading this page.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details
                                style={{
                                    textAlign: 'left',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.875rem',
                                }}
                            >
                                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', fontWeight: '600' }}>
                                    Error Details (Development Only)
                                </summary>
                                <pre style={{ overflow: 'auto', margin: 0 }}>
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={this.handleReset}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#667eea',
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => window.location.href = '/'}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: 'white',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid white',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
