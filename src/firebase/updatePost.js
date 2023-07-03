import React from 'react'
import { firebase_db } from './config';
import { doc, updateDoc } from "firebase/firestore";

const db = firebase_db

const PublishOrPullDown =async (id, updateData) => {
    console.log('id: ', id, 'updatedata: ', updateData)
    let result = null;
    let error = null;
    try {
      result = await updateDoc(doc(db, 'posts', id), updateData 
      );
  } catch (e) {
      error = e;
  }
  return { result, error };
}

export default PublishOrPullDown