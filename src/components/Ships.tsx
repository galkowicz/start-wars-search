import React from 'react'
import { fetchShips } from '../util'
import useStore from '../store/useStore'

const Ships: React.FC = () => {
  const [store] = useStore()
  const { selectedItem } = store
  const { name, starships } = selectedItem

  const [shipsList, setShipsList] = React.useState([])
  React.useEffect(() => {
    const initialFetch = async () => {
      if (name) {
        const data = await fetchShips(starships)
        setShipsList(data)
      }
    }
    initialFetch()
  }, [starships, name])

  if (!name) return null

  return (
    <div role="presentation" className="ships" style={{ marginLeft: '4px' }}>
      <div>{`${name}'s startships:`}</div>
      {shipsList && (
        <ul>
          {shipsList.length > 0 &&
            shipsList.map((ship: { url: string; name: string }) => <li key={ship.url}>{ship.name}</li>)}
        </ul>
      )}
    </div>
  )
}

export default Ships
