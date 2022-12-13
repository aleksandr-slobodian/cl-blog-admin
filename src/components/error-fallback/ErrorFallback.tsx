import { ErrorBoundary } from "react-error-boundary";
export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: ErrorBoundary["resetErrorBoundary"];
}) => {
  return (
    <div role="alert" id="error_fallback_root">
      <h1>Error</h1>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
