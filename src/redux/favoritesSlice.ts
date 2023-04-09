import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [] as Number[],
  },
  reducers: {
    addFavorite: (state, action) => {
      const id = action.payload
      state.favorites.push(id)
    },

    removeFavorite: (state, action) => {
      const index = state.favorites.findIndex((id) => id === action.payload)
      if (index !== -1) {
        state.favorites.splice(index, 1)
      }
    },

    saveFavoritesFromStorage: (state, action) => {
      state.favorites = [...action.payload]
    },
  },
})

export const { addFavorite, removeFavorite, saveFavoritesFromStorage } =
  favoritesSlice.actions

export const getFavorites = (state: any) => state.favorites

export default favoritesSlice.reducer
