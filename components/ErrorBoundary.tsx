import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // FIX: Initialize state in the constructor and access it with `this.state` to fix "Property 'state' does not exist on type 'ErrorBoundary'".
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    // FIX: Call `setState` using `this.setState` to update the component's state to fix "Property 'setState' does not exist on type 'ErrorBoundary'".
    this.setState({
      errorInfo: errorInfo
    });
  }

  render() {
    // FIX: Access state properties using `this.state` to fix "Property 'state' does not exist on type 'ErrorBoundary'".
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '20px', margin: '20px', border: '2px solid red', borderRadius: '8px', backgroundColor: '#fff0f0', color: '#333', direction: 'rtl', textAlign: 'right' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>حدث خطأ ما.</h1>
          <p style={{ marginTop: '10px' }}>نعتذر، لقد واجه التطبيق مشكلة غير متوقعة. الرجاء محاولة تحديث الصفحة.</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '15px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>تفاصيل الخطأ (للمطور)</summary>
            {/* FIX: Access state properties using `this.state` to fix "Property 'state' does not exist on type 'ErrorBoundary'". */}
            {this.state.error && this.state.error.toString()}
            <br />
            {/* FIX: Access state properties using `this.state` to fix "Property 'state' does not exist on type 'ErrorBoundary'". */}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // FIX: Access props using `this.props` to fix "Property 'props' does not exist on type 'ErrorBoundary'". This also helps resolve the error in index.tsx about missing children.
    return this.props.children;
  }
}

export default ErrorBoundary;
