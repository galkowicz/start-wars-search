import React from 'react'
import { useDebounce } from 'react-use'
import { Grid, Input } from 'semantic-ui-react'

import useStore from '../store/useStore'
import { fetchAllPeople, parsePeopleData, BASE_URL } from '../util'
import { Actions } from '../types/appActions'

const StarWarsSearch: React.FC = () => {
  const [, dispatch] = useStore()
  const [searchString, setSearchString] = React.useState('')

  React.useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchAllPeople(`${BASE_URL}/people/`)
      const parsedData = parsePeopleData(data)
      dispatch({ type: Actions.SET_ALL_PEOPLE, payload: { people: parsedData } })
    }
    initialFetch()
  }, [dispatch])

  useDebounce(
    () => {
      dispatch({ type: Actions.SET_SEARCH_STRING, payload: { searchString } })
    },
    300,
    [searchString],
  )

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchString(e.currentTarget.value)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Input onChange={handleInputChange} placeholder="Search..." />
      </Grid.Column>
    </Grid>
  )
}

export default StarWarsSearch
