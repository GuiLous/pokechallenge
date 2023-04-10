import { renderHook } from '@testing-library/react'
import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterAll(() => {
    localStorage.clear()
  })

  it('should call getFavoritesFromStorage and return favorites from localStorage', () => {
    const favorites = [1]
    localStorage.setItem('@pokechallenge:favorites', JSON.stringify(favorites))

    const { result } = renderHook(() => useLocalStorage())

    const getFavoritesSpy = jest.spyOn(
      result.current,
      'getFavoritesFromStorage',
    )

    const resultGetFavorites = getFavoritesSpy()

    expect(resultGetFavorites).toEqual(favorites)
    expect(getFavoritesSpy).toHaveBeenCalledTimes(1)
  })

  it('should call setFavorites', () => {
    const newFavorites = [1]

    const { getFavoritesFromStorage } = useLocalStorage()

    const { result } = renderHook(() => useLocalStorage())

    const setFavoritesSpy = jest.spyOn(result.current, 'setFavoritesOnStorage')

    setFavoritesSpy(newFavorites)

    const favorites = getFavoritesFromStorage()

    expect(setFavoritesSpy).toHaveBeenCalledTimes(1)
    expect(favorites).toEqual(newFavorites)
  })
})
