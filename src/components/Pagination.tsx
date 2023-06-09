import { Button, Flex, Text } from '@chakra-ui/react'
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  nextPage: string | null
  previousPage: string | null
  getPreviousPage: () => void
  getNextPage: () => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  getNextPage,
  getPreviousPage,
  nextPage,
  previousPage,
  totalPages,
  isLoading = false,
}: PaginationProps) {
  const canClickPreviousPage = previousPage !== null && !isLoading
  const canClickNextPage = nextPage !== null && !isLoading

  return (
    <Flex as="div" alignItems="center" flexDir="row">
      <Button
        variant="unstyled"
        cursor={previousPage === null ? 'initial' : 'pointer'}
        onClick={canClickPreviousPage ? getPreviousPage : () => {}}
        aria-label="previous page"
      >
        <CaretCircleLeft
          color={previousPage === null ? '#9699B0' : '#D1D2DC'}
          size={32}
          weight="fill"
        />
      </Button>
      <Text color="white" mr={2}>
        {currentPage} de {totalPages}
      </Text>
      <Button
        variant="unstyled"
        cursor={nextPage === null ? 'initial' : 'pointer'}
        onClick={canClickNextPage ? getNextPage : () => {}}
        aria-label="next page"
      >
        <CaretCircleRight
          color={nextPage === null ? '#9699B0' : '#D1D2DC'}
          size={32}
          weight="fill"
        />
      </Button>
    </Flex>
  )
}
