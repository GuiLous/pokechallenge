import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface HeaderProps {
  activePage?: 'Home' | 'List'
}

export function Header({ activePage = 'Home' }: HeaderProps) {
  const logoImg =
    'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'

  return (
    <Flex
      as="header"
      bgColor="blue.800"
      align="center"
      justifyContent="space-between"
      py={5}
      px={8}
      boxShadow="md"
    >
      <Link to="/">
        <img
          alt="pokeapi-logo"
          src={logoImg}
          className="navbar-img"
          width={90}
        />
      </Link>

      <Flex align="center" gap={4} as="nav" mr={10}>
        <Link to="/">
          <Text
            fontSize={18}
            color="white"
            fontWeight="bold"
            border={activePage === 'Home' ? '2px' : '0'}
            borderColor="white"
            py={1}
            px={3}
            rounded="xl"
          >
            Home
          </Text>
        </Link>
        <Link to="/list">
          <Text
            fontSize={18}
            color="white"
            fontWeight="bold"
            py={1}
            px={5}
            border={activePage === 'List' ? '2px' : '0'}
            borderColor="white"
            rounded="xl"
          >
            List
          </Text>
        </Link>
      </Flex>

      <Box />
    </Flex>
  )
}
