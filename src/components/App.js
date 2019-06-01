import React from 'react'

import DevTools from './DevTools'
import Sidebar from './Sidebar'
import Switcher from './Switcher'

import styles from '../css/App.css'

export default () => (
  <div>
    <div className={styles.app}>
      <Sidebar />
      <Switcher />
    </div>

    <DevTools />
  </div>
)
