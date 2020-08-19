import React from 'react'
import { AppActions } from '../types/appActions'

type ContextState = any

declare interface StoreProps {
  children: React.ReactNode
  appReducer: (store: ContextState, action: AppActions) => ContextState
  initialState: ContextState
  storageKey: string
}

const context = React.createContext({} as ContextState)

export const StoreProvider: React.FC<StoreProps> = ({
  children,
  appReducer,
  initialState = {},
  storageKey,
}: StoreProps) => {
  try {
    // eslint-disable-next-line no-param-reassign
    initialState = JSON.parse(localStorage.getItem(storageKey) as any) || initialState
  } catch {}

  // wrap reducer with localStorage functionality
  const reducer = (store: ContextState, action: AppActions) => {
    const newState = appReducer(store, action)
    localStorage.setItem(storageKey, JSON.stringify(newState))
    return { ...newState }
  }

  const [store, dispatch] = React.useReducer(reducer, initialState)

  const contextValue = React.useMemo(() => [store, dispatch], [store])

  return <context.Provider value={contextValue}>{children}</context.Provider>
}

export default (): [ContextState, React.Dispatch<AppActions>] => {
  return React.useContext(context)
}
