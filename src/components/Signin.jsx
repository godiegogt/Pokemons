import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signinAccion } from '../redux/usuarioDucks'


const Signin = (props) => {


    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const activo = useSelector(store => store.usuario.activo)
    const usererror = useSelector(store => store.usuario.user_error)

    React.useEffect(() => {
        console.log(activo)
        if (activo) {
            props.history.push('/')
        }
    }, [activo, props.history])


    return (
        <div className={{ textlign: 'center' }}>
            <h2>Registro</h2>
            {
                usererror&&(<div className="alert alert-danger" role="alert">
                {usererror}
            </div>)
            }
            

            <div className="form-group">
                <label >Email address</label>
                <input onChange={(e) => setEmail(e.target.value)} className="form-control" value={email} />

            </div>
            <div className="form-group">
                <label >Password</label>
                <input onChange={(e) => setPass(e.target.value)} type="password" className="form-control" value={pass} />
            </div>


            <button className="btn btn-primary" onClick={() => dispatch(signinAccion(email, pass))}>Registrarse</button>

            <button type="submit" className="btn btn-danger">Ingresa con Google</button>

        </div>
    )
}

export default withRouter(Signin)
