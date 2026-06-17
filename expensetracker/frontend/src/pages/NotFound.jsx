import { Link } from "react-router-dom"
function NotFound() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "80vh" }}
        >
            <h1 style={{ fontSize: "5rem" }}>Sorry!</h1>

            <h3>We can't seem to find the resource you're looking for.</h3>
            <p>Please check that the Web site address is spelled correctly.
                Or go to <Link
                    to="/"
                >
                    Go to Dashboard
                </Link>, and use the menus to navigate to a specific section.</p>
        </div>
    );
}

export default NotFound;