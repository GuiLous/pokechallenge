import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
    blue: {
      '800': '#0f224a',
      '700': '#19528E',
      '600': '#2B6CB0',
      '500': '#3182CE',
      '400': '#4299E1',
      '300': '#63B3ED',
      '200': '#90CDF4',
      '100': '#BEE3F8',
      '50': '#EBF8FF',
    },
    yellow: {
      '600': '#B7791F',
      '500': '#D69E2E',
      '400': '#FFCC00',
      '300': '#F6E05E',
      '200': '#FAF089',
      '100': '#FEFCBF',
      '50': '#FFFFF0',
    },
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      body: {
        bgColor: 'blue.700',
        color: 'gray.300',
      },
    },
  },
})
