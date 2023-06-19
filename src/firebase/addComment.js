import React from 'react'
import {firebase_db} from "./config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const db = firebase_db

const addComment =async (commentObject) => {
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