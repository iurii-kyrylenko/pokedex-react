import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './components/Pokedex'
import PokemonPage from './components/PokemonPage'
import AddPokemonCard from './components/AddPokemonCard'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import 'tachyons'
import './index.css'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj2ru08721dzf0160jd3fn7km'
})
const dataIdFromObject = (obj) => obj.id

const client = new ApolloClient({ networkInterface, dataIdFromObject })

ReactDOM.render((
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/:page([1-9][0-9]*)" component={ Pokedex } />
        <Route path="/view/:pokemonId" component={ PokemonPage } />
        <Route path="/create/:trainerId" component={ AddPokemonCard } />
        <Redirect from="*" to="/1" />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
