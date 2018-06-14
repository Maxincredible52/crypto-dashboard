import { format } from 'd3-format'

class fmt {
  currencyFormat(num) {
    return format('.3s')(num)
  }
}

export const Format = new fmt()
