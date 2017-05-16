import React from 'react'
import ReactDOM from 'react-dom'
import Pokedex from './components/Pokedex'
import { BrowserRouter, Route } from 'react-router-dom'
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

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <div>
        <Route path='/' component={ Pokedex } />
      </div>
    </BrowserRouter>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
