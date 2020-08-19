// eslint-disable-next-line max-classes-per-file
export const Actions = {
  SET_ALL_PEOPLE: 'setAllPeople',
  SET_SEARCH_STRING: 'setSearchString',
  SELECT_ITEM: 'selectItem',
}

export interface AppAction {
  type: string
}

export interface Character {
  displayName: string
  name: string
  starships: string[]
  url: string
}

export class SetAllPeople implements AppAction {
  readonly type = Actions.SET_ALL_PEOPLE

  constructor(public payload: { people: Character[] }) {}
}

export class SetSearchString implements AppAction {
  readonly type = Actions.SET_SEARCH_STRING

  constructor(public payload: { searchString: string }) {}
}

export class SelectItem implements AppAction {
  readonly type = Actions.SET_SEARCH_STRING

  constructor(public payload: { url: string; starships: string[]; name: string; selectedIndex: number }) {}
}

export type AppActions = SetAllPeople | SetSearchString | SelectItem
