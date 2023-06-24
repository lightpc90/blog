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
    const [ctxLoaded, setCtxLoaded] = React.useState(false)

    //function to fetch the logged in user
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
        if (user) {
            const {result, error} = await getAUser(user.uid)
            if(result){ setUser(result.data())
            }
            else{console.log('error getting users in authContext', error)}
        } else {
            setUser(null);
        }
        setCtxLoaded(true)
        });

        //function to fetch all posts from database
        const fetchPosts = async()=>{
            const {result, error} = await getPosts()
            if (result){
                console.log('post result from context: ', result.docs)
                setCtxPosts(result.docs.map((post)=>{
                    return{...post.data(), id:post.id}
                    
                }))
            }
            else if(error){console.log('error fetching posts in context: ', error)}     
        }

    React.useEffect(() => {
        return () => unsubscribe();
    }, []);

    React.useEffect(()=>{ 
        fetchPosts()
        setLoading(false)
    }, [ctxLoaded])

    return (
        <AuthContext.Provider value={{user, ctxPosts, setCtxPosts, ctxLoaded}}>
            {loading && !ctxLoaded ? <Row css={{height: '100%', top: '$15'}} justify='center'><Loading type='points' color="secondary"/></Row> : children}
        </AuthContext.Provider>
    );
};