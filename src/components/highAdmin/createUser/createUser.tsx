import { ChangeEvent, useState } from "react"
import handleRequests from "../../../services/handleRequests"
import { useNavigate } from "react-router-dom"
import './createUser.css'
import objectService from "../../../services/checkObject"
import rutFormater from "../../../services/rutFormater"

const CreateUser = () => {
    const [newRut, setNewRut] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [dependencias, setDependencias] = useState('Municipalidad norte')
    const [direccion, setDireccion] = useState('')
    const [numMuni, setNumMuni] = useState('')
    const [anexo, setAnexo] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState('user')

    const navigate = useNavigate()

    const handleNewUser = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        const newUser = {
            rut: newRut,
            nombres,
            apellidos,
            email,
            passHash: password,
            rol,
            dependencias,
            direcciones: direccion,
            numMunicipal: numMuni,
            anexoMunicipal: anexo
        }
        // Revisando que el objeto no tenga campos vacíos:
        if (objectService.checkObject(newUser)) {
            const filterEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            if (filterEmail.test(email)) {
                handleRequests.createUser(newUser)
                .then(res => {
                    alert(res.message)
                    setTimeout(() => {
                        navigate('/data/superadmin')
                    }, 500)
                })
                .catch(error => {
                    alert(error.response.data.error)
                })
            } else {
                alert('Formato de correo incorrecto!')
            }
        } else {
            alert('Faltan datos por ingresar!')
        }
        
    }

    const handleRut = (event: ChangeEvent<HTMLInputElement>) => {
        const rut = event.target.value
        if (rutFormater(rut)) {
            setNewRut(rut)
        }
    }

    const handleRol = (event: ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case 'superAdmin':
                setRol('superAdmin')
                break
            case 'admin':
                setRol('admin')
                break
            case 'user':
                setRol('user')
                break
            default:
                setRol('user')
        }
    }

    const handleNumMuni = (event: ChangeEvent<HTMLInputElement>) => {
        const filterNumber = /[^0-9\s+]/g
        if (filterNumber.test(event.target.value) || event.target.value.length + 1 === 17) {
            return
        } else {
            setNumMuni(event.target.value)
        }
    }

    const handleAnexo = (event: ChangeEvent<HTMLInputElement>) => {
        const filterAnexo = /[^0-9]/g
        console.log(event.target.value.length)
        if (filterAnexo.test(event.target.value) || event.target.value.length + 1 === 6) {
            return
        } else {
            setAnexo(event.target.value)
        }
    }
 
    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <div className="newUser-wrapper">
            <div className="newUser-form">
                <h1 className="newUser-title">Añadir un nuevo usuario</h1>
                <form style={{ display: 'flex', justifyContent: 'center' }}>
                    <section className="general-info">
                        <h2 className="newUser-subtitle">Información personal</h2>
                        <label className="newUserElement" htmlFor="crearRut">Rut:</label><br />
                        <input id="crearRut" type="text" onChange={handleRut} value={newRut} placeholder="12.345.678-9"></input><br />
                        <label htmlFor="crearNombres">Nombres:</label><br />
                        <input id="crearNombres" type="text" onChange={e => setNombres(e.target.value)} placeholder="Nombre(s) por aquí..."></input><br />
                        <label htmlFor="crearApellidos">Apellidos:</label><br />
                        <input id="crearApellidos" type="text" onChange={e => setApellidos(e.target.value)} placeholder="Apellido(s) por aquí..."></input><br />
                        <label htmlFor="crearCorreo">Correo:</label><br />
                        <input id="crearCorreo" type="text" onChange={e => setEmail(e.target.value)} placeholder="ejemplo@correo.com"></input><br />
                    </section>

                    <section className="work-info">
                        <h3 className="newUser-subtitle">Información de trabajo</h3>
                        <label htmlFor="rol">Rol:</label><br />
                        <select id="rol" onChange={handleRol} value={rol}>
                            <optgroup label="-- Seleccionar una opción">
                                <option>user</option>
                                <option>admin</option>
                                <option>superAdmin</option>
                            </optgroup>
                        </select><br />
                        <label htmlFor="dependencias">Dependencias:</label><br />
                    <select id="dependencias" onChange={event => setDependencias(event.target.value)} value={dependencias}>
                            <optgroup label="-- Selecciona una opción">
                                <option>Municipalidad norte</option>
                                <option>Municipalidad centro</option>
                                <option>Municipalidad sur</option>
                            </optgroup>
                    </select><br />
                        {/* <input id="dependencias" type="text" onChange={e => setDependencias(e.target.value)} placeholder="Municipalidad norte"></input><br /> */}

                        <label htmlFor="direcciones">Direcciones:</label><br />
                        <input id="direcciones" type="text" onChange={e => setDireccion(e.target.value)} placeholder="Iquique"></input><br />
                        <label htmlFor="num-muni">Número municipal:</label><br />
                        <input id="num-muni" type="text" onChange={handleNumMuni} placeholder="9 1111 1111" value={numMuni}></input><br />
                        <label htmlFor="anexo-muni">Anexo municipal:</label><br />
                        <input id="anexo-muni" type="text" onChange={handleAnexo} placeholder="9999" value={anexo}></input><br />
                    </section>
                </form>
                <section className="newUser-submitSection">
                    <label htmlFor="contraseña">Ingrese una contraseña:</label>
                    <input id="contraseña" type="password" onChange={handlePassword}></input><br />
                    <input className="newUser-submit" type="submit" value="Registrarse" onClick={handleNewUser} disabled={false} />
                </section>
            </div>
        </div>
    )
}

export default CreateUser