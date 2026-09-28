import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/brutalism.css';
import './styles/index.css';
import './styles/dynamic.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught rendering error in React:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          fontFamily: 'monospace',
          background: '#FFF8E7',
          color: '#111111',
          border: '4px solid #111111',
          margin: '20px',
          boxShadow: '8px 8px 0 #111111'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#dc2626' }}>
            [SHREEYA_OS] RENDERING DIAGNOSTIC
          </h1>
          <p style={{ marginTop: '10px', fontSize: '16px' }}>
            <strong>Error:</strong> {this.state.error?.toString()}
          </p>
          <pre style={{
            background: '#ffffff',
            padding: '16px',
            border: '2px solid #111111',
            marginTop: '16px',
            overflowX: 'auto',
            fontSize: '12px'
          }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#FFD83D',
              border: '2px solid #111111',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            RELOAD INTERFACE
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
