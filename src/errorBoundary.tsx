import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

interface IProps {}

interface IState {
  error: any;
  errorInfo: any;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: any) {
    return {
      error
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return error ? (
      <div style={styles}>
        <h1>Opps..</h1>
        <p>This component failed to render...</p>
        <hr />
        <p>{error.message}</p>
        <Link to="/">Back to home page</Link>
      </div>
    ) : (
      children
    );
  }
}

const styles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "pink",
  color: "black"
};

export default ErrorBoundary;
