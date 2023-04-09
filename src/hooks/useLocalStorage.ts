export default function useLocalStorage() {
  function getFavoritesFromStorage() {
    const favoritesString = localStorage.getItem('@pokechallenge:favorites')
    const favoritesArray = favoritesString ? JSON.parse(favoritesString) : []

    return favoritesArray
  }

  function setFavoritesOnStorage(newFavorites: number[]) {
    localStorage.setItem(
      '@pokechallenge:favorites',
      JSON.stringify(newFavorites),
    )
  }

  return { getFavoritesFromStorage, setFavoritesOnStorage }
}
