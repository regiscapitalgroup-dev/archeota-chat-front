import { Link } from "react-router-dom";

const RegisterSuccess = () => {
    return (
        <>
            <div className="text-center mb-5">
                <h1 className="text-dark mb-3">Thanks for signing up!</h1>
                <div className="text-gray-400 fw-bold fs-4">
                    Please check your email to confirm your account.
                </div>
                <Link to='/auth/login'>
                    <button className="btn btn-lg btn-dark w-100 mt-5">
                        Sign in
                    </button>
                </Link>
            </div>
        </>
    )
}

export default RegisterSuccess;