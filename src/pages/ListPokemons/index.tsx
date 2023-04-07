import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import { PokemonCard } from './components/PokemonCard'
import axios from 'axios'

import { Pagination } from '@/components/Pagination'
import { Header } from '@/components/Header'
import { PokemonDTO } from '@/dtos/PokemonDTO'

export function ListPokemons() {
  const [isLoading, setIsLoading] = useState(true)
  const [pokemonsData, setPokemonsData] = useState<PokemonDTO[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [previousPage, setPreviousPage] = useState<string | null>(null)

  const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'

  async function handleGetPreviousPage() {
    setCurrentPage(currentPage - 1)
    getPokemons(String(previousPage))
  }

  function handleGetNextPage() {
    setCurrentPage(currentPage + 1)
    getPokemons(String(nextPage))
  }

  async function getPokemons(url = '') {
    try {
      setIsLoading(true)
      let resultInfos = null

      if (url !== '') {
        resultInfos = await axios.get(url)
      } else {
        resultInfos = await axios.get(apiBaseUrl)
      }

      setTotalPages(Math.ceil(resultInfos.data.count / 20))
      setNextPage(resultInfos.data.next)
      setPreviousPage(resultInfos.data.previous)

      const endPointsPokemons = resultInfos.data?.results.map(
        (data: any) => data.url,
      )

      const resultPokemonsInfos = await axios.all(
        endPointsPokemons.map((endPoint: any) =>
          axios.get(endPoint).then((response) => response.data),
        ),
      )

      const pokemonsData = resultPokemonsInfos.map((data: any) => {
        return {
          id: data.id,
          name: data.name,
          type: data.types.map((data: any) => data.type.name),
          imageUrl: data.sprites.front_default,
        }
      })

      setPokemonsData(pokemonsData)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPokemons()
  }, [])

  console.log('🚀 - totalPages:', totalPages)
  console.log('🚀 - nextPage:', nextPage)
  console.log('🚀 - previousPage:', previousPage)
  console.log('🚀 - pokemonsData:', pokemonsData)

  return (
    <Box display="flex" flexDir="column">
      <Header activePage="List" />
      <Flex
        as="main"
        alignItems="center"
        justifyContent="space-between"
        mt={10}
        px={10}
      >
        <Heading fontSize={24} color="yellow.400">
          Pokémons
        </Heading>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPreviousPage={handleGetPreviousPage}
          getNextPage={handleGetNextPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </Flex>

      {isLoading ? (
        <Flex alignItems="center" justifyContent="center">
          <Spinner color="white" />
        </Flex>
      ) : (
        <Flex
          as="section"
          mt={10}
          px={10}
          gap={4}
          flexWrap="wrap"
          mb={10}
          justifyContent="center"
        >
          {pokemonsData.map((pokemonData) => (
            <PokemonCard key={pokemonData.id} data={pokemonData} />
          ))}
        </Flex>
      )}
    </Box>
  )
}
