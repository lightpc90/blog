import React, { useState } from 'react';
import { Container, Loading, Row } from '@nextui-org/react';
import {
    onAuthStateChanged, getAuth,
} from 'firebase/auth';
import {app} from '../firebase/config';
import getAUser from '@/firebase/user/getAUser';
import getPosts from '@/firebase/getPosts';

const auth = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [ctxPosts, setCtxPosts] = React.useState([])

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

    React.useEffect(()=>{
        const fetchPosts = async()=>{
            const {result, error} = await getPosts()
            if (result){
                console.log(' post result from context: ', result.docs)
                setCtxPosts(result.docs.map((post)=>{
                    return{...post.data(), id:post.id}
                }))
            }
            if(error){console.log('error fetching posts in context: ', error)}
        }
        return () => fetchPosts()
    }, [])

    return (
        <AuthContext.Provider value={{user, ctxPosts}}>
            {loading ? <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row> : children}
        </AuthContext.Provider>
    );
};