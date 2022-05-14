import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ClientsTableContainer, ClientsTableContainerWithAsyncClass } from '../src/clients/ClientsTableContainer'
import { ErrorBoundary } from '../src/common/ErrorBoundary'
import { useState } from 'react'

const Home: NextPage = () => {
  const [toggle, setToggled] = useState(true)

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <h2>Some other content</h2>
        <button onClick={() => {
          setToggled((t) => !t)
        }}>Toggle me</button>
        {
          toggle ? (
            <ErrorBoundary scope='clients' errorCompoennt={(<div>Ups something went wrong</div>)}>
            <ClientsTableContainerWithAsyncClass />
          </ErrorBoundary>
          )
          : null
        }
      </div>
    </ErrorBoundary>
  )
}

export default Home
