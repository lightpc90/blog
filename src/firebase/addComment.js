import React from 'react'
import {firebase_db} from "./config";
import { collection, updateDoc } from "firebase/firestore";

const db = firebase_db

const addComment =async ({commentObject}) => {
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString();
    commentObject.created = currentTimeString
    const comment = commentObject
    let result = null;
    let error = null;
    try {
      result = await updateDoc(collection(db, 'posts', comment.postId), comment, 
      );
  } catch (e) {
      error = e;
  }
  return { result, error };
}

export default addComment