import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {cerrarSesionAccion} from '../redux/usuarioDucks'
import {withRouter,Link,NavLink} from 'react-router-dom'


 const Navbar = (props) => {
    const dispatch = useDispatch()

    const activo = useSelector(store => store.usuario.activo)

    const cerrarSesion = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">APP POKE</Link>
            <div className="d-flex">
                {
                    activo ? (
                        <>
                            <NavLink className="btn btn-dark mr-2" to="/" exact>Inicio</NavLink>
                            <button className="btn btn-dark mr-2" onClick={() => cerrarSesion()}>
                                Cerrar Sesión
                            </button>
                        </>

                    ) : (<>
                        <NavLink className="btn btn-dark mr-2" to="/login" exact>Login</NavLink>
                        <NavLink className="btn btn-dark mr-2" to="/signin" exact>Sigin</NavLink>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default withRouter(Navbar)
