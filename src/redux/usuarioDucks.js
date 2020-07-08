import {auth, firebase,db} from '../libreries/firebaseconfig'
const dataInicial = {
    loading: false,
    activo: false,
    user: {},
    user_error:''
}

const LOADING = 'LOADING'
const USER_EXITO = 'USER_EXITO'
//const SIGNIN_EXITO='SIGNIN_EXITO'
const USER_ERROR = 'USER_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'

export default function userReducer(state = dataInicial, action) {

    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USER_ERROR:
            return { ...state,user_error:action.payload }
        case USER_EXITO:
            return { ...state, loading: false, activo: true, user: action.payload.user }
        case CERRAR_SESION:
            return { ...dataInicial}
        default:
            return { ...state }
    }

}

export const accederAccion = () => async (dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        console.log(res)
        dispatch({
            type: USER_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
}))

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => async (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USER_EXITO,
            payload: {
                user: JSON.parse(localStorage.getItem('usuario'))
            }
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    console.log("User",auth.currentUser)
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
       
    })
}

//Registrar usuarios
export const signinAccion = (email,pass) => async (dispatch) => {
    console.log(email,pass)

    

    dispatch({
        type: LOADING
    })

    try {

        const res = await auth.createUserWithEmailAndPassword(email, pass)
        console.log(res)
        await db.collection('usuarios').doc(res.user.email).set({
            fechaCreacion: Date.now(),
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            email: res.user.email,
            uid: res.user.uid
        })
        dispatch({
            type: USER_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
}))

    } catch (e) {
        let error='';
        console.log(e)
        
        if(e.code === 'auth/email-already-in-use'){
            error='Usuario ya registrado...'
            console.log(error)
          
        }
        if(e.code === 'auth/invalid-email'){
            error='Email no válido'
            console.log(error)
           
        }
        if(e.code==='auth/weak-password'){
            error='Ups! Tu contraseña debe tener al menos 6 caracteres.'
            console.log(error)
        }
        
        console.log(error)
        dispatch({
            type: USER_ERROR,
            payload:error
        })
    }
}

export const loginWIthEmailAccion = (email,pass) => async (dispatch) => {

    dispatch({
        type: LOADING
    })

    try {

       
        const res = await auth.signInWithEmailAndPassword(email,pass)
        console.log(res)
        dispatch({
            type: USER_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
        uid: res.user.uid,
        email: res.user.email
}))

    } catch (e) {
        let error=''
        console.log(e.code)
        if (e.code==='auth/user-not-found') {
            error='Email no registrado.'
        }
        if(e.code==='auth/wrong-password'){
            error='Contraseña incorrecta'
        }


        console.log(error)
        dispatch({
            type: USER_ERROR,
            payload:error
        })
    }
}