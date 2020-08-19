import React from 'react'
import useStore from '../store/useStore'

import './ListItem.scss'
import { Actions } from '../types/appActions'
import Ships from './Ships'

interface ItemProps {
  name: string
  url: string
  starships: string[]
  isSelected: boolean
  index: number
}

const ListItem: React.FC<ItemProps> = ({ name, url, starships, isSelected, index }) => {
  const [, dispatch] = useStore()
  const handleSelectItem = () => {
    dispatch({ type: Actions.SELECT_ITEM, payload: { url, starships, name, selectedIndex: index } })
  }

  return (
    <div role="presentation" className={`list-item ${isSelected ? 'selected' : ''}`} onClick={handleSelectItem}>
      <div>{name}</div>
      {isSelected && <Ships />}
    </div>
  )
}

export default ListItem
