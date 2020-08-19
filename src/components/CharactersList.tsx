import React from 'react'
import { List, ListRowProps } from 'react-virtualized'
import { Container, Header } from 'semantic-ui-react'
import useStore from '../store/useStore'
import ListItem from './ListItem'
import { Character } from '../types/appActions'

const CharactersList: React.FC = () => {
  const [store] = useStore()
  const { people, searchString, selectedItem } = store

  const [list, setList] = React.useState(people)

  React.useEffect(() => {
    let updatedList
    if (searchString !== '') {
      updatedList = people.filter((item: Character) => item.name.includes(searchString.toLowerCase()))
    } else {
      updatedList = people
    }

    updatedList = updatedList.map((item: Character) => {
      let isSelected = false
      if (selectedItem && selectedItem.url === item.url) {
        isSelected = true
      }
      return { ...item, isSelected }
    })

    setList(updatedList)
  }, [searchString, selectedItem, people])

  const getRowHeight = ({ index }: { index: number }) => {
    const rowHeight = 30
    if (selectedItem.selectedIndex === index) {
      return selectedItem.starships.length * rowHeight
    }
    return rowHeight
  }

  const rowRenderer: React.FC<ListRowProps> = ({ key, index, style }) => {
    const { displayName, url, starships, isSelected } = list[index]

    return (
      <div key={key} style={style}>
        <ListItem name={displayName} url={url} starships={starships} isSelected={isSelected} index={index} />
      </div>
    )
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as="h2">Characters</Header>
      <List rowRenderer={rowRenderer} rowCount={list.length} width={300} height={300} rowHeight={getRowHeight} />
    </Container>
  )
}

export default CharactersList
