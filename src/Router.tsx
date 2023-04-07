import { Route, Routes } from 'react-router-dom'

import { ListPokemons } from '@pages/ListPokemons'
import { Home } from '@pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ListPokemons />} />
    </Routes>
  )
}
