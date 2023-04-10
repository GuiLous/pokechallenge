import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logoImg from '@assets/logo.png'

interface HeaderProps {
  activePage?: 'Home' | 'List'
}

export function Header({ activePage = 'Home' }: HeaderProps) {
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
        <Image
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
            transition="all"
            _hover={{
              bgColor: activePage === 'Home' ? 'gray.300' : '',
            }}
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
            transition="all"
            _hover={{
              bgColor: activePage === 'List' ? 'gray.300' : '',
            }}
          >
            Lista
          </Text>
        </Link>
      </Flex>

      <Box />
    </Flex>
  )
}
