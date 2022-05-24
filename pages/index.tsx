import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ClientsTableContainerWithAsyncClass } from '../src/clients/ClientsTableContainer'
import { ErrorBoundary } from '../src/common/ErrorBoundary'
import { useAuthContext } from '../src/auth/AuthContext'
import { AuthGuard } from '../src/auth/AuthGuard'

const Home: NextPage = () => {
    const { logout } = useAuthContext()

    return (
        <AuthGuard>
            <ErrorBoundary>
                <div className={styles.container}>
                    {/* <h2>We'll be back at 17:14 on this PC's clock</h2> */}
                    <button onClick={logout}>Log out</button>
                    <ErrorBoundary scope='clients' errorCompoennt={(<div>Ups something went wrong</div>)}>
                        <ClientsTableContainerWithAsyncClass />
                    </ErrorBoundary>
                </div>
            </ErrorBoundary>
        </AuthGuard>
    )
}

export default Home
