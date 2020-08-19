import React from 'react'
import { Container, Header, Grid } from 'semantic-ui-react'

import { StoreProvider } from './store/useStore'
import appReducer from './store/reducer'

import StarWarsSearch from './components/StarWarsSearch'

import './App.scss'
import CharactersList from './components/CharactersList'
import Ships from './components/Ships'

const initialState = {
  searchString: '',
  people: [],
  selectedItem: { name: null, starships: null, selectedIndex: -1 },
}

const App: React.FC = () => {
  return (
    <StoreProvider storageKey="starWarsStore" initialState={initialState} appReducer={appReducer}>
      <Container style={{ marginTop: '2em' }}>
        <Header as="h2">STAR WARS FAN APP</Header>
        <Grid columns={2} divided>
          <Grid.Column>
            <StarWarsSearch />
            <CharactersList />
          </Grid.Column>
          <Grid.Column>
            <Ships />
          </Grid.Column>
        </Grid>
      </Container>
    </StoreProvider>
  )
}

export default App
