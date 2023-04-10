import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Pagination } from '../Pagination'

describe('Pagination component', () => {
  it('should renders correctly', () => {
    const mockGetNextPage = jest.fn()
    const mockGetPreviousPage = jest.fn()

    const { debug, getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        nextPage={'teste'}
        previousPage={'test'}
        getNextPage={mockGetNextPage}
        getPreviousPage={mockGetPreviousPage}
      />,
    )

    debug()

    expect(getByText('1 de 1')).toBeInTheDocument()
  })

  it('should call getNextPage function', () => {
    let currentPage = 1

    const mockGetNextPage = jest.fn(() => {
      currentPage += 1
    })

    const mockGetPreviousPage = jest.fn()

    const { debug, getByRole } = render(
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        nextPage={'teste'}
        previousPage={'test'}
        getNextPage={mockGetNextPage}
        getPreviousPage={mockGetPreviousPage}
      />,
    )

    debug()

    const nextPageButton = getByRole('button', { name: 'next page' })
    fireEvent.click(nextPageButton)

    expect(mockGetNextPage).toHaveBeenCalled()
    expect(currentPage).toBe(2)
  })

  it('should call getPreviousPage function', () => {
    let currentPage = 2

    const mockGetNextPage = jest.fn()

    const mockGetPreviousPage = jest.fn(() => {
      currentPage += -1
    })

    const { debug, getByRole } = render(
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        nextPage={'teste'}
        previousPage={'test'}
        getNextPage={mockGetNextPage}
        getPreviousPage={mockGetPreviousPage}
      />,
    )

    debug()

    const previousPageButton = getByRole('button', { name: 'previous page' })
    fireEvent.click(previousPageButton)

    expect(mockGetPreviousPage).toHaveBeenCalled()
    expect(currentPage).toBe(1)
  })

  it('should not call getNextPage function if nextPage equal null', () => {
    let currentPage = 1

    const mockGetNextPage = jest.fn(() => {
      currentPage += 1
    })

    const mockGetPreviousPage = jest.fn()

    const { debug, getByRole } = render(
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        nextPage={null}
        previousPage={'test'}
        getNextPage={mockGetNextPage}
        getPreviousPage={mockGetPreviousPage}
      />,
    )

    debug()

    const nextPageButton = getByRole('button', { name: 'next page' })
    fireEvent.click(nextPageButton)

    expect(mockGetNextPage).not.toHaveBeenCalled()
    expect(currentPage).toBe(1)
  })

  it('should not call getPreviousPage function if previousPage equal null', () => {
    let currentPage = 2

    const mockGetNextPage = jest.fn()

    const mockGetPreviousPage = jest.fn(() => {
      currentPage += -1
    })

    const { debug, getByRole } = render(
      <Pagination
        currentPage={currentPage}
        totalPages={1}
        nextPage={'teste'}
        previousPage={null}
        getNextPage={mockGetNextPage}
        getPreviousPage={mockGetPreviousPage}
      />,
    )

    debug()

    const previousPageButton = getByRole('button', { name: 'previous page' })
    fireEvent.click(previousPageButton)

    expect(mockGetPreviousPage).not.toHaveBeenCalled()
    expect(currentPage).toBe(2)
  })
})
