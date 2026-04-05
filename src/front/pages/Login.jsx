import { useNavigate } from "react-router-dom"
import { useState } from "react"


export const Login = () => {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if(response.ok){
        const data = await response.json()
        sessionStorage.setItem("jwt-token", data.token)
        navigate("/private")
    }else{
        alert("Email o contarseña incorrectos")
    }
}
    
    return (
        <div className="container mt-5">
            <h1>Inicio de sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}