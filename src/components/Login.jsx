import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {accederAccion, loginWIthEmailAccion} from '../redux/usuarioDucks'

import {withRouter} from 'react-router-dom'

 const Login = (props) => {

    const dispatch = useDispatch()
   const loading = useSelector(store => store.usuario.loading)
    const activo = useSelector(store => store.usuario.activo)
    const usererror=useSelector(store => store.usuario.user_error)

    const [email,setEmail]=useState('');
    const [pass,setPass]=useState('');
    
    React.useEffect(() => {
        console.log(activo)
        if(activo){
           props.history.push('/')
        }
    }, [activo,props.history])
    return (
        <div className={{textlign:'center'}}>
            <h2>Login</h2>{
            usererror&&(<div className="alert alert-danger" role="alert">
                {usererror}
            </div>)
            }
           
                <div className="form-group">
                    <label >Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input  onChange={(e) => setPass(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
                </div>

                <button onClick={()=>dispatch(loginWIthEmailAccion(email,pass))} className="btn btn-primary" >Submit</button>
           
            <button  className="btn btn-danger" onClick={() => dispatch(accederAccion())} disabled={loading}>Google</button>

            
        </div>
    )
}

export default withRouter(Login)