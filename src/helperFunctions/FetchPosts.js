import React from 'react'

const FetchPosts = (status, ctxPosts, user, setDrafts, setPublished) => {

        if(status==='Draft'){
            const AllDraft =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Draft")})
            console.log('all draft: ', AllDraft)
            setDrafts(AllDraft)
        }
        
        else if (status==='Published'){
            const AllPublished =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Published")})
            console.log('all published: ', AllPublished)
            setPublished(AllPublished)
        }
        else{
            const AllDraft =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Draft")})
            console.log('all draft: ', AllDraft)
            setDrafts(AllDraft)  

            const AllPublished =  ctxPosts.filter((ctxPost)=>{return(ctxPost.author === user.id && ctxPost.status === "Published")})
            console.log('all published: ', AllPublished)
            setPublished(AllPublished)
        }
}

export default FetchPosts