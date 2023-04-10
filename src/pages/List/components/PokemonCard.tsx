import { Box, Button, Flex, Image, Text, Tooltip } from '@chakra-ui/react'
import { BookmarkSimple } from '@phosphor-icons/react'
import { useDispatch, useSelector } from 'react-redux'

import { PokemonDTO } from '@dtos/PokemonDTO'
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '@redux/favoritesSlice'
import useLocalStorage from '@hooks/useLocalStorage'

interface PokemonCardProps {
  data: PokemonDTO
}

export function PokemonCard({ data }: PokemonCardProps) {
  const dispatch = useDispatch()
  const { favorites } = useSelector(getFavorites)

  const { setFavoritesOnStorage } = useLocalStorage()

  const handleAddFavorite = (id: number) => {
    dispatch(addFavorite(id))
    setFavoritesOnStorage([...favorites, id])
  }

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id))

    const favoritesFiltered = favorites.filter(
      (favoriteId: number) => favoriteId !== id,
    )

    setFavoritesOnStorage(favoritesFiltered)
  }

  return (
    <Flex
      bgColor="gray.50"
      rounded="lg"
      overflow="hidden"
      boxShadow="2xl"
      cursor="pointer"
      transition="ease-in-out"
      _hover={{
        transform: 'scale(1.05)',
        boxShadow: 'dark-lg',
      }}
      w="330px"
    >
      <Box
        position="relative"
        bgColor="gray.50"
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="140px"
      >
        <Image src={data.imageUrl} alt={data.name} />

        <Text color="gray.500" position="absolute" top={0} right={1}>
          #{data.id}
        </Text>
      </Box>
      <Flex bg="gray.100" py={2} pl={4} justifyContent="space-between" w="full">
        <Box display="flex" flexDir="column">
          <Text
            color="gray.600"
            fontWeight={700}
            fontSize={18}
            textTransform="capitalize"
          >
            {data.name}
          </Text>

          <Text as="span" fontSize={14} color="blue.500">
            {data.type.reduce((acc, item) => {
              return (acc += item + ' ')
            }, '')}
          </Text>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="unstyled"
            display="flex"
            _hover={{ color: 'yellow.400' }}
          >
            <Tooltip
              color="white"
              bgColor="yellow.400"
              label={
                favorites.includes(data.id)
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
              aria-label="Um tooltip"
            >
              {favorites.includes(data.id) ? (
                <BookmarkSimple
                  size={24}
                  weight={favorites.includes(data.id) && 'fill'}
                  color={favorites.includes(data.id) && '#FFCC00'}
                  onClick={() => handleRemoveFavorite(data.id)}
                />
              ) : (
                <BookmarkSimple
                  size={24}
                  onClick={() => handleAddFavorite(data.id)}
                />
              )}
            </Tooltip>
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
