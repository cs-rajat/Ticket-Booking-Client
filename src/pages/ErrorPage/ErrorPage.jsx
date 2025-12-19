import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg mt-2 text-base-content/70">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-sm text-base-content/60 mt-2">
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
