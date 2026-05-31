import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card bg-base-100 shadow-xl max-w-md w-full">
                <div className="card-body items-center text-center">
                    <FaShieldAlt className="text-error text-6xl" />

                    <h1 className="text-5xl font-bold text-error">
                        403
                    </h1>

                    <h2 className="text-2xl font-semibold">
                        Access Forbidden
                    </h2>

                    <p className="text-base-content/70">
                        You don't have permission to access this page.
                        Contact an administrator if you believe this is a mistake.
                    </p>

                    <div className="card-actions mt-4">
                        <Link to="/">
                            <button className="btn bg-green-500">
                                <FaArrowLeft />
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;