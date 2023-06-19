import React from 'react'
import {firebase_db} from "./config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const db = firebase_db

const addComment =async (commentObject) => {
    const currentDate = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    commentObject.created = formattedDate
  
    let result = null;
    let error = null;
    try {
      result = await updateDoc(doc(db, 'posts', commentObject.postId), {comments: arrayUnion(commentObject)}, 
      );
  } catch (e) {
      error = e;
  }
  return { result, error };
}

export default addComment