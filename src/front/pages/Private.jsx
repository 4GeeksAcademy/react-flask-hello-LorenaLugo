import { useEffect } from "react"
import { useNavigate } from "react-router-dom"




export const Private = () => {

const navigate = useNavigate()

useEffect(()=>{
    const token = sessionStorage.getItem("jwt-token")

    if(!token){
        navigate("/login")
    }
},[])

    return (
    <div className="container mt-5">
        <h1>Página privada 🔒</h1>
        <p>Bienvenido</p>
    </div>
)
}