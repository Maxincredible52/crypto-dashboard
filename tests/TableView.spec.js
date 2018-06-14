import TableView from '../src/components/TableView'
import Vue from 'vue'
import Buefy from 'buefy'

describe('TableView.vue', () => {
  it('sets correct class based on value', () => {
    expect(TableView.methods.getClass(1)).toBe('positive-change')
    expect(TableView.methods.getClass(-1)).toBe('negative-change')
  })

  it('component gets initialized', () => {
    Vue.use(Buefy)
    const vm = new Vue(TableView).$mount()
    expect(vm).toBeTruthy()
  })
})
