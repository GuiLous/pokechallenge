import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { Header } from '@/components/Header'
import ashImage from '@assets/ash-img.png'

export function Home() {
  return (
    <Box>
      <Header />
      <Flex as="main" flexDir="column" py={20}>
        <HStack>
          <Box bgColor="yellow.400" h="400px" w="15%" pos="relative">
            <Image
              src={ashImage}
              alt="Imagem do personagem ash e do pikachu"
              h="400px"
              pos="absolute"
              top={10}
              right="-6rem"
            />
          </Box>

          <Flex flex={1} px="9rem" flexDir="column" gap={8}>
            <Heading color="white">
              Poké Challenge: Conheça os fantásticos Pokémons.
            </Heading>

            <Text color="white" textAlign="justify">
              Pokémon é uma franquia de jogos eletrônicos desenvolvida pela
              empresa japonesa Game Freak em parceria com a Nintendo. <br /> O
              primeiro game foi lançado em 1996 e desde então a marca se tornou
              um fenômeno de popularidade. Os jogos são ambientados em
              continentes fictícios onde os players assumem o papel de
              treinadores de criaturas mágicas conhecidas como Pokémon. <br />{' '}
              Cada monstrinho possui habilidades únicas – e os jogadores
              precisam treiná-los e desenvolvê-los para participar de batalhas
              contra outros treinadores. <br /> Os games da série principal se
              encaixam no gênero RPG. Os duelos ocorrem em turnos, isto é, cada
              rodada uma criatura executa um movimento. Essas ações podem ser
              ofensivas ou defensivas. Tudo depende da estratégia do player.
              Além desses jogos, que são os mais famosos, existem outras
              produções. <br />
              Temos, por exemplo, títulos dos gêneros puzzle, arcade, cartas e
              até mesmo MOBA.
            </Text>

            <Link to="list">
              <Button
                bgColor="yellow.400"
                color="white"
                fontSize={22}
                fontWeight="bold"
                w="full"
                boxShadow="xl"
                _hover={{
                  bgColor: 'yellow.500',
                }}
              >
                Conheça os Pokémons!
              </Button>
            </Link>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  )
}
