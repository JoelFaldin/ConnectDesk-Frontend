import { ChangeEvent, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import handleRequest from '../../services/handleRequests'

const Login = () => {
    const [rut, setRut] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleRut = (event: ChangeEvent<HTMLInputElement>) => {
        const filterCharacters = /[^0-9\.k-]/g
        if (filterCharacters.test(event.target.value) || event.target.value.length + 1 === 14) {
            return
        } else if (!filterCharacters.test(event.target.value)) {
            setRut(event.target.value)
        }
    }
    
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleAuth = async (rut: string, password: string) => {
        try {
            const res = await handleRequest.verify(rut, password)
            if (res.access === 'admin')            {
                navigate('/data/admin')
            } else if (res.access === 'superAdmin') {
                navigate('/data/superadmin ')
            } else if (res.access === 'user') {
                navigate('/data/user')
            }
        } catch(error: any) {
            alert(error.response.data.message)
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        await handleAuth(rut, password)
    }

    return (
        <>
            <div className="login-img"></div>
            <div className="form">
                <form>
                    <h1 className="login-title">Ingresar</h1>
                    <div className="container mx-auto">
                        <label className="input-label" htmlFor="rut">Rut</label>
                        <input className="input" id="rut" type="text" required placeholder="Ingrese su rut..." value={rut} onChange={handleRut} autoComplete="false"></input>
                        <label className="input-label" htmlFor="password">Contraseña:</label>
                        <input className="input" id="password" type="password" required placeholder="Ingrese su contraseña..." value={password} onChange={handlePassword}></input>
                        <a className="options">¿Olvidaste tu contraseña?</a>
                        <a className="options">Crear nuevo usuario</a>
                        <input className="submit" type='submit' value="Ingresar" onClick={handleSubmit} />
                    </div>
                    {/* Falta: hacer componentes para registrarse y cambiar la contraseña */}
                </form>
            </div>
        </>
    )
}

export default Login