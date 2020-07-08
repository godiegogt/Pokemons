
import axios from 'axios'
//constants
const dataInitial={
    previous:'',
    next:'',
    data:[],
    pokemon:{}
}

//types
const GET_POKE_SUCCESS='GET_POKE_SUCCESS'
const NEXT_POKE_SUCCESS='NEXT_POKE_SUCCESS'
const PREVIUOS_POKE_SUCCESS='PREVIUOS_POKE_SUCCESS'
const GET_ONE_POKE_SUCCESS='GET_ONE_POKE_SUCCESS'

//reducer
export default function pokesReducer(state = dataInitial, action){
    switch(action.type){
        case GET_POKE_SUCCESS:
            return {...state, ...action.payload}
        case NEXT_POKE_SUCCESS:
            return {...state, ...action.payload}
        case PREVIUOS_POKE_SUCCESS:
            return {...state, ...action.payload}
        case GET_ONE_POKE_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state
    }
}

//actions

//Get pokemons

export const getPokemonsAction=()=> async (dispatch, getState)=>{
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=5')
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: {previous:res.data.previous,next:res.data.next,data:res.data.results}
        })
    } catch (error) {
        console.log(error)
    }

}



//Next pokemons

export const nextPokemonsAction=()=> async (dispatch, getState)=>{

    const {next}=getState().pokemones

    if(next){
        try {
            const res = await axios.get(next)
            dispatch({
                type: NEXT_POKE_SUCCESS,
                payload: {previous:res.data.previous,next:res.data.next,data:res.data.results}
            })
        } catch (error) {
            console.log(error)
        }

    }else{
        dispatch({
            type: NEXT_POKE_SUCCESS,
            payload: getState().pokemones
        })


    }

    

}


//previuos pokemons

export const previuosPokemonsAction=()=> async (dispatch, getState)=>{

    const {previous}=getState().pokemones

    if(previous){
        try {
            const res = await axios.get(previous)
            dispatch({
                type: PREVIUOS_POKE_SUCCESS,
                payload: {previous:res.data.previous,next:res.data.next,data:res.data.results}
            })
        } catch (error) {
            console.log(error)
        }

    }else{
        dispatch({
            type: PREVIUOS_POKE_SUCCESS,
            payload: getState().pokemones
        })


    }

    

}

export const getOnePokemonAction=(pokemonurl='https://pokeapi.co/api/v2/pokemon/1/')=> async (dispatch, getState)=>{
        try {
            const res= await axios.get(pokemonurl)
            dispatch({
                type: GET_ONE_POKE_SUCCESS,
                payload: {pokemon:{name:res.data.name,image:res.data.sprites.front_default,height:res.data.height}}
            })
        } catch (error) {
            console.log(error)
        }

}

