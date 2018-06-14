import { shallowMount } from '@vue/test-utils'
import CoinDetails from '../src/components/CoinDetails'

describe('CoinDetails.vue', () => {

  const coinData = {
    name: 'Bitcoin',
    symbol: 'BTC',
    id: 1,
  }

  const getComponent = ({ loading }) => {
    return shallowMount(CoinDetails, {
      mocks: { $apolloData: { loading } },
      data: function () { return { coinData } },
    })
  }

  it('should be a vue instance', () => {
    const wrapper = getComponent({ loading: true })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should be a CoinDetails instance', () => {
    const wrapper = getComponent({ loading: true })
    expect(wrapper.is(CoinDetails)).toBeTruthy()
  })

  it('should not render the details section if loading', () => {
    const wrapper = getComponent({ loading: true })
    expect(wrapper.contains('#details-section')).toBeFalsy()
  })

  it('should render the details settings if there is data', () => {
    const wrapper = getComponent({ loading: false })
    expect(wrapper.contains('#details-section')).toBeTruthy()
  })

  it('should display loading in the title when loading', () => {
    const wrapper = getComponent({ loading: true })
    expect(wrapper.find('.title').html()).toContain('Loading...')
  })

  it('should display currency info if present', () => {
    const wrapper = getComponent({ loading: false })
    const titleHtml = wrapper.find('.title').html()
    expect(titleHtml).toContain(coinData.name)
    expect(titleHtml).toContain(coinData.symbol)
  })

})
