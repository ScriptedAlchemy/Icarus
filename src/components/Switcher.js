import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'transition-group'
import loadable from '@loadable/component'

import isLoading from '../selectors/isLoading'
import styles from '../css/Switcher.css'

const Switcher = ({ page, direction }) => {
  const Loaded = loadable(() => import(`./${page}`))
  return (
    <TransitionGroup
      className={`${styles.switcher} ${direction}`}
      duration={500}
      prefix='fade'
    >
      <Transition key={page}>
        <Loaded />
      </Transition>
    </TransitionGroup>
  )
}

const mapState = ({ page, direction, ...state }) => ({
  page,
  direction,
  isLoading: isLoading(state),
})

export default connect(mapState)(Switcher)
