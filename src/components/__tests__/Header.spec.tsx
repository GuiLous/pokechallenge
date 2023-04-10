import React from 'react'
import { render } from '@testing-library/react'

import { Header } from '../Header'
import { BrowserRouter } from 'react-router-dom'

describe('Header component', () => {
  it('should renders correctly', () => {
    const { debug, getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )

    debug()

    expect(getByText('Home')).toBeInTheDocument()
    expect(getByText('Lista')).toBeInTheDocument()
  })
})
