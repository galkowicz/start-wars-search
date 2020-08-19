// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Actions, AppActions } from '../types/appActions'

interface AppState {
  searchString: string
  people: { displayName: string; name: string; starships: string[]; url: string }[]
  selectedItem: { name: string; starships: string[]; selectedIndex: number; url: string }
}

const appReducer = (state: AppState, action: AppActions): AppState => {
  const { type, payload } = action

  switch (type) {
    case Actions.SET_ALL_PEOPLE: {
      const { people } = payload
      return { ...state, people }
    }

    case Actions.SET_SEARCH_STRING: {
      const { searchString } = payload
      return { ...state, searchString }
    }

    case Actions.SELECT_ITEM: {
      const { url, starships, name, selectedIndex } = payload
      return { ...state, selectedItem: { starships, url, name, selectedIndex } }
    }

    default:
      throw new Error()
  }
}

export default appReducer
