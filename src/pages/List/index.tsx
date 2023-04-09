import { useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Heading,
  Spinner,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { PokemonCard } from './components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { Pagination } from '@/components/Pagination'
import { Header } from '@/components/Header'
import { PokemonDTO } from '@/dtos/PokemonDTO'
import { getFavorites, saveFavoritesFromStorage } from '@/redux/favoritesSlice'
import useLocalStorage from '@/hooks/useLocalStorage'

export function List() {
  const { getFavoritesFromStorage } = useLocalStorage()

  const toast = useToast()

  const dispatch = useDispatch()
  const { favorites } = useSelector(getFavorites)

  const [isLoading, setIsLoading] = useState(true)
  const [pokemonsData, setPokemonsData] = useState<PokemonDTO[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [nextPage, setNextPage] = useState<string | null>(null)
  const [previousPage, setPreviousPage] = useState<string | null>(null)
  const [isPokemonsSelected, setIsPokemonsSelected] = useState(true)

  const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'

  async function handleGetPreviousPage() {
    setCurrentPage(currentPage - 1)
    fetchPokemons(String(previousPage))
  }

  function handleGetNextPage() {
    setCurrentPage(currentPage + 1)
    fetchPokemons(String(nextPage))
  }

  async function fetchPokemons(url = '') {
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
      toast({
        title: 'Erro ao carregar Pokémons!',
        description:
          'Um erro inesperado ao carregar os Pokémons aconteceu, tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchFavoritesPokemons() {
    try {
      setIsLoading(true)

      const endPointsPokemons = favorites.map(
        (id: number) => `${apiBaseUrl}/${id}/`,
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
      toast({
        title: 'Erro ao carregar seus favoritos!',
        description:
          'Um erro inesperado ao carregar os favoritos aconteceu, tente novamente!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isPokemonsSelected) {
      fetchPokemons()
    } else {
      fetchFavoritesPokemons()
    }
  }, [isPokemonsSelected])

  useEffect(() => {
    const favorites = getFavoritesFromStorage()
    dispatch(saveFavoritesFromStorage(favorites))
  }, [])

  return (
    <VStack as="main" align="stretch" gap={6} h="100vh">
      <Header activePage="List" />
      <Flex alignItems="center" justifyContent="space-between" px={10}>
        <Heading fontSize={24}>
          <Button
            variant="unstyled"
            fontWeight="bold"
            color={isPokemonsSelected ? 'yellow.400' : ''}
            textDecor={isPokemonsSelected ? 'underline' : ''}
            onClick={() => setIsPokemonsSelected(true)}
          >
            Pokémons
          </Button>{' '}
          |{' '}
          <Button
            variant="unstyled"
            fontWeight="bold"
            color={isPokemonsSelected ? '' : 'yellow.400'}
            textDecor={isPokemonsSelected ? '' : 'underline'}
            onClick={() => setIsPokemonsSelected(false)}
          >
            Meus Favoritos
          </Button>
        </Heading>

        {isPokemonsSelected && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getPreviousPage={handleGetPreviousPage}
            getNextPage={handleGetNextPage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )}
      </Flex>

      {isLoading ? (
        <Flex alignItems="center" justifyContent="center" flex="1">
          <Spinner color="white" />
        </Flex>
      ) : (
        <Flex
          as="section"
          px={10}
          gap={4}
          flexWrap="wrap"
          mb={10}
          justifyContent="center"
        >
          {pokemonsData.map((pokemonData) =>
            isPokemonsSelected ? (
              <PokemonCard key={pokemonData.id} data={pokemonData} />
            ) : (
              favorites.includes(pokemonData.id) && (
                <PokemonCard key={pokemonData.id} data={pokemonData} />
              )
            ),
          )}
        </Flex>
      )}
    </VStack>
  )
}
