import {firebase_db} from "../config";
import { doc, getDoc } from "firebase/firestore";

const db = firebase_db
export default async function getAUser(id) {
    let docRef = doc(db, 'users', id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
