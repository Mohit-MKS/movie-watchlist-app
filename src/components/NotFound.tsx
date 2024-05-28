import { Link } from "react-router-dom";

export default function ErrorPage() {

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}