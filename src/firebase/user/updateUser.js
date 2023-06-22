import React from 'react'
import { firebase_db } from '../config';
import { doc, updateDoc } from "firebase/firestore";

const db = firebase_db

const UpdateUser =async (userUpdate) => {
    let result = null;
    let error = null;
    try {
      result = await updateDoc(doc(db, 'users', userUpdate.id), userUpdate, 
      );
  } catch (e) {
      error = e;
  }
  return { result, error };
}

export default UpdateUser