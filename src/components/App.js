import React from 'react'

import SomeComponent from 'website2/SomeComponent'
import Sidebar from './Sidebar'

import styles from '../css/App.css'

export default () => (
  <div>
    <div className={styles.app}>
      <Sidebar />
      <SomeComponent />
    </div>
  </div>
)
