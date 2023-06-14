import React from 'react';
import { Container, Loading, Row } from '@nextui-org/react';
import {
    onAuthStateChanged, getAuth,
} from 'firebase/auth';
import {app} from '../firebase/config';

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Row css={{height: '100%', top: '$5'}} justify='center'><Loading color="secondary">Secondary</Loading></Row> : children}
        </AuthContext.Provider>
    );
};