import React from 'react'
import { shallow } from 'enzyme'
import intl from '@gem-mine/intl'
import BasicRouter from '@/page/home'

test('Error renderer', async (done) => {
  await intl.init({
    locale: 'zz',
    locales: {
      zz: {}
    }
  })
  const wrapper = shallow(
    <BasicRouter />
  )
  expect(wrapper.find('.gm-logo')).toBeTruthy()
  done()
})
