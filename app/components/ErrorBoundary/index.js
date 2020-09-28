import React from "react";
import { Result, Button } from "antd";
import MainLayout from "containers/common/MainLayout";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }
  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { logout, user } = this.props;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <MainLayout logout={logout} user={user}>
          <Result
            status="warning"
            title="OOPS !! Something Went Wrong ,Please try again"
            extra={
              <Button type="primary" key="console" onClick={this.handleReload}>
                Retry
              </Button>
            }
          />
        </MainLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
