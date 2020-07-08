import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokesReducer from './PokemonesDucks'
import userReducer from './usuarioDucks'
import { leerUsuarioActivoAccion } from './usuarioDucks'

const rootReducer=combineReducers({
    pokemones:pokesReducer,
    usuario:userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    leerUsuarioActivoAccion()(store.dispatch)
    return store
}