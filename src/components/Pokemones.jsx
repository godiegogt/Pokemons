import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemonsAction,nextPokemonsAction,previuosPokemonsAction,getOnePokemonAction } from '../redux/PokemonesDucks'


export const Pokemones = () => {




    // declaramos displach para llamar a la acción o acciones
    const dispatch = useDispatch()

    useEffect( () => {

        const getInfo = async () => {
            dispatch(getPokemonsAction())
            dispatch(getOnePokemonAction())

        }
        getInfo()


    }, [dispatch])
    const pokemons = useSelector(store => store.pokemones)
    const pokemon = useSelector(store => store.pokemones.pokemon)

    return (
        <div className="row">
            <div className="col-6">
                <ul className="list-group">

                    {
                        pokemons.data.map(item =>
                        (<li key={item.name}className="list-group-item "><button onClick={()=>dispatch(getOnePokemonAction(item.url))} type="button" className="btn btn-success btn-lg btn-block">{item.name}</button></li>))
                    }
                </ul>

                <div className="btn-group" role="group" aria-label="Basic example">
                    {
                        pokemons.previous!==null? (<button  type="button"  className="btn btn-secondary" onClick={()=>dispatch(previuosPokemonsAction())}>Previus</button>)
                        :
                       ( <button  type="button" disabled className="btn btn-secondary" onClick={()=>dispatch(previuosPokemonsAction())}>Previus</button>)
                    }
                   
                    
                    <button type="button" className="btn btn-secondary" onClick={()=>dispatch(nextPokemonsAction())}>Next</button>
                    
                </div>


            </div>
            <div className="col-6">

            <div className="card" style={{width: '18rem'}}>
                <img src={pokemon.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h2>{pokemon.name}</h2>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>


                
                
            </div>



        </div>
    )
}
