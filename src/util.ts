import { Character } from './types/appActions'

const accumulatedResults: any = []
export const BASE_URL = 'https://swapi.dev/api'

export const fetchAllPeople = async (url: string): Promise<any> => {
  if (!url) return Promise.resolve(accumulatedResults)
  const response = await fetch(url)
  const { results, next } = await response.json()
  accumulatedResults.push(...results)
  return fetchAllPeople(next)
}

export const fetchShips = async (shipsUrl: string[]): Promise<any> => {
  return Promise.all(
    shipsUrl.map(async (url) => {
      const response = await fetch(url)
      return response.json()
    }),
  )
}

export const parsePeopleData = (data: Array<any>): Array<Character> => {
  return data.map((item) => {
    const { name, starships, url } = item
    return { name: name.toLowerCase(), starships, url, displayName: name }
  })
}
