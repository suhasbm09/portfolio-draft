import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white">
          <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-6">An unexpected error occurred. Please try reloading the page.</p>
          <button onClick={this.handleReload} className="px-6 py-2 rounded bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow-lg hover:from-cyan-500 hover:to-purple-600 transition">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 