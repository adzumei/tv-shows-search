import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 — Page Not Found</h2>
            <Link to="/" className="home-link">Go back to home</Link>
        </div>
    );
};

export default NotFound;
