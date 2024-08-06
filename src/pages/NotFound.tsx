import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="container flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">Page Not Found</h1>
        <Link className="underline text-blue" to="/">Go home page</Link>
      </div>
    </main>
  );
};

export default NotFound;
