import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("jwt-token"); // borra la pulsera
        navigate("/login"); // redirige al login
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto d-flex gap-2">
                    <Link to="/signup">
                        <button className="btn btn-secondary">Registro</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};