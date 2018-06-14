import { shallowMount } from '@vue/test-utils'
import CoinDetails from '../src/components/CoinDetails'

describe('CoinDetails.vue', () => {
  it('displays', () => {
    const details = shallowMount(CoinDetails, {
      mocks: { $apolloData: { loading: true } },
    })
    expect(details.isVueInstance()).toBeTruthy()
  })
})