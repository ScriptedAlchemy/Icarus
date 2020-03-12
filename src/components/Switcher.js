import React from 'react'
import { connect } from 'react-redux'
import loadable from '@loadable/component'

import isLoading from '../selectors/isLoading'

const Switcher = ({ page, direction }) => {
  const Loaded = loadable(() => import(`./${page}`))
  return <Loaded />
}

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state)
})

export default connect(mapState)(Switcher)
