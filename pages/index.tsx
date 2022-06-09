import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ClientsTableContainer } from '../src/clients/ClientsTableContainer'
import { ErrorBoundary } from '../src/common/ErrorBoundary'
import { AuthGuard } from '../src/auth/AuthGuard'
import { userStoreInstance } from '../src/auth/AuthContext'

const Home: NextPage = () => {
    return (
        <AuthGuard>
            <ErrorBoundary>
                <div className={styles.container}>
                    <button onClick={userStoreInstance.logout}>Log out</button>
                    <ErrorBoundary scope='clients' errorCompoennt={(<div>Ups something went wrong</div>)}>
                        <ClientsTableContainer />
                    </ErrorBoundary>
                </div>
            </ErrorBoundary>
        </AuthGuard>
    )
}

export default Home
