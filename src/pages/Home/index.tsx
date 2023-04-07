import { Box, Flex } from '@chakra-ui/react'

import { Header } from '@/components/Header'

export function Home() {
  return (
    <Box>
      <Header />
      <Flex as="main" flexDir="column"></Flex>
    </Box>
  )
}
