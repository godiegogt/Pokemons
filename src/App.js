import React from 'react';

import './App.css';
import  Navbar  from './components/Navbar';
import { Pokemones } from "./components/Pokemones";
//import generateStore from './redux/Store'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'

import  Login  from './components/Login';
import  Signin  from './components/Signin';
import {auth} from './libreries/firebaseconfig'


function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)
  //const store = generateStore()

  

  React.useEffect(() =>  {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    } 
    fetchUser()
}, [])

  // LocalStorage
  const Routeprivate = ({component, path, ...rest}) => {

    
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        console.log('son iguales')
        return <Route component={component} path={path} {...rest} />
      }else{
        console.log('no exite')
        return <Redirect to="/login" {...rest} />
      }
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }
  return  firebaseUser !== false?(
 
      <Router>
       <Navbar />
        <div className="container">
        <Switch>
          <Routeprivate component={Pokemones} path='/' exact/>
          <Route component={Login} path='/login' exact/>
          <Route component={Signin} path='/signin' exact/>
        </Switch>
        </div>
      </Router>
 


  ):(<h2>Cargando</h2>);
}

export default App;
