import React from 'react';
import { Container, Loading, Row } from '@nextui-org/react';
import {
    onAuthStateChanged, getAuth,
} from 'firebase/auth';
import {app} from '../firebase/config';
import getAUser from '@/firebase/user/getAUser';

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if (user) {
                const {result, error} = await getAUser(user.uid)
                if(result){ setUser(result.data())
                }
                else{console.log('error getting users in authContext', error)}
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row> : children}
        </AuthContext.Provider>
    );
};