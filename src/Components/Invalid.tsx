import { Link } from "react-router-dom";

export function Invalid(){
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center bg-dark text-danger mt-5">
        <div>
        <h2>Invalid Credentials</h2>
        <div className="text-center">
        <Link to='/'>Try Again</Link>
        </div>
        </div>
        </div>
    )
}