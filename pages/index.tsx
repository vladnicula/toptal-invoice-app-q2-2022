import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { ClientsTableContainer } from '../src/clients/ClientsTableContainer'
import { ErrorBoundary } from '../src/common/ErrorBoundary'
import { useAuthContext } from '../src/auth/AuthContext'
import { AuthGuard } from '../src/auth/AuthGuard'

const Home: NextPage = () => {
    const { logout } = useAuthContext()

    return (
        <AuthGuard>
            {/* <h2>Be back at 16:57 on this PC's clock</h2> */}
            <ErrorBoundary>
                <div className={styles.container}>
                    <button onClick={logout}>Log out</button>
                    <ErrorBoundary scope='clients' errorCompoennt={(<div>Ups something went wrong</div>)}>
                        <ClientsTableContainer />
                    </ErrorBoundary>
                </div>
            </ErrorBoundary>
        </AuthGuard>
    )
}

export default Home
